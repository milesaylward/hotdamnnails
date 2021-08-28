<template>
  <div class="page booking">
    <Hero
      title="Booking"
      video="https://dl.airtable.com/.attachments/dda1f57a1256a5082a9a1267a89993d0/a3a6c324/policy_cover.mp4"
      fallback="https://dl.airtable.com/.attachments/02217580f492a317fcf7ddf2d4f5e450/492d60b1/policy_fallback.jpeg"
      @load="handleVideoLoaded"
    />
    <div class="container">
      <div class="booking__content" :class="{ total: appointmentType }">
        <h1>Appointment Types</h1>
        <div class="appointments" ref="types">
          <button
            class="appointments__button"
            @click="handleChooseType(appt)"
            v-for="appt in appointmentData"
            :class="{
              active: appointmentType && appointmentType.name === appt.name,
              inactive: appointmentType && appointmentType.name !== appt.name,
            }"
            :key="appt.id"
          >
            {{appt.name}}
          </button>
        </div>
        <transition name="fade">
          <div class="screen" v-if="appointmentType">
            <h1>{{preCopy}}</h1>
            <div class="screen__content">
              <div v-for="opt in preOpts" :key="opt.id" class="radio"
                :class="{
                  active: preChoice && preChoice.id === opt.id
                }"
              >
                <input
                  type="checkbox"
                  :id="opt.id"
                  :value="opt"
                  @change="handlePreChange(opt)"
                >
                <span class="radio__control"></span>
                <span class="radio__label">{{opt.name}}</span>
              </div>
            </div>
            <transition name="fade">
              <div v-if="preChoice && lengths.length">
                <h1>Length</h1>
                <div class="screen__content">
                  <button class="screen__content__button"
                    v-for="length in lengths"
                    :key="length.id"
                    @click="handleChooseLength(length)"
                    :class="{
                      active: lengthChoice && lengthChoice.id === length.id,
                      inactive: lengthChoice && lengthChoice.id !== length.id,
                    }"
                  >
                    {{length.name}}
                  </button>
                </div>
                <h4>Custom Shape:</h4>
                <div class="shape-opts">
                  <div v-for="opt in shapeOpts" :key="opt.id" class="radio"
                    :class="{
                      active: shapeChoice && shapeChoice.id === opt.id
                    }"
                  >
                    <input
                      type="checkbox"
                      :id="opt.id"
                      :value="opt"
                      @change="handleShapeChange(opt)"
                    >
                    <span class="radio__control"></span>
                    <span class="radio__label">{{opt.name}}</span>
                  </div>
                </div>
              </div>
            </transition>
            <transition name="fade" @afterEnter="handleScrollTo('design')">
              <div v-if="lengthChoice" ref="design">
                <h1 v-if="designs.length">Design</h1>
                <div class="screen__content" v-if="designs.length">
                  <button class="screen__content__button"
                    v-for="design in designs"
                    :key="design.id"
                    @click="handleChooseDesign(design)"
                    :class="{
                      active: designChoice && designChoice.id === design.id,
                      inactive: designChoice && designChoice.id !== design.id,
                    }"
                  >
                    {{design.name}}
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </transition>
      </div>
      <div class="booking__total" v-if="appointmentType">
        <div class="booking__total__content">
          <h3>{{appointmentType.name}}</h3>
          <p v-if="preChoice">
            <span>{{preChoice.name}}</span>
            <span>{{preChoice.price}}$</span>
          </p>
          <p v-if="lengthChoice">
            <span>{{lengthChoice.name}}</span>
            <span>{{lengthChoice.price}}$</span>
          </p>
          <p v-if="shapeChoice" class="sub">
            <span>{{shapeChoice.name}}</span>
            <span>{{shapeChoice.price}}$</span>
          </p>
          <p v-if="designChoice">
            <span>{{designChoice.name}}</span>
            <span>{{designChoice.price}}$</span>
          </p>
          <p class="total" v-if="preChoice && lengthChoice && designChoice">
            <span>Total: </span>
            <span>{{totalPrice}}$</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Hero from '@/components/Hero.vue';

export default {
  name: 'Booking',
  components: {
    Hero,
  },
  data: () => ({
    fallback: true,
    currentStep: 0,
    appointmentType: null,
    addons: [],
    soakOff: null,
    lengthChoice: null,
    designChoice: null,
    preChoice: null,
    shapeChoice: null,
    totalSteps: 0,
  }),
  computed: {
    ...mapState(['appointmentData']),
    preCopy() {
      if (!this.appointmentType) return '';
      return this.appointmentType.name === 'Fresh Set' ? 'Do you need a Soak Off?' : 'Pre-Options';
    },
    shapeOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.shape_opts;
      return opts.sort((a, b) => { if (a.price < b.price) return 1; return -1; });
    },
    preOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.pre_opts;
      return opts.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    lengths() {
      if (!this.appointmentType) return [];
      const lengths = this.appointmentType.length_opts;
      return lengths.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    designs() {
      if (!this.appointmentType) return [];
      const designs = this.appointmentType.designs_opts;
      return designs.sort((a, b) => { if (a.duration > b.duration) return 1; return -1; });
    },
    totalPrice() {
      const {
        preChoice,
        shapeChoice,
        lengthChoice,
        designChoice,
      } = this;
      let price = 0;
      price += this.appointmentType.price;
      price += lengthChoice.price;
      price += designChoice.price;
      if (preChoice) price += preChoice.price;
      if (shapeChoice) price += shapeChoice.price;
      return price;
    },
  },
  mounted() {
    console.log(this.appointmentData, 'in booking');
  },
  methods: {
    ...mapActions(['setPageLoaded']),
    handleScrollTo(id) {
      this.$refs[id].scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    },
    resetOpts() {
      this.addons = [];
      this.designChoice = null;
      this.lengthChoice = null;
    },
    handleShapeChange(opt) {
      const { shapeChoice } = this;
      if (shapeChoice && shapeChoice.id === opt.id) {
        this.addons = this.addons.filter((id) => id !== opt.id);
        this.shapeChoice = null;
      } else {
        this.addons.push(opt.id);
        this.shapeChoice = opt;
      }
    },
    handlePreChange(opt) {
      const { preChoice } = this;
      if (preChoice) {
        this.addons = this.addons.filter((id) => id !== preChoice.id);
      }
      this.addons.push(opt.id);
      this.preChoice = opt;
    },
    handleChooseType(type) {
      this.appointmentType = type;
      this.resetOpts();
    },
    handleChooseLength(length) {
      const { lengthChoice } = this;
      if (lengthChoice) {
        this.addons = this.addons.filter((addon) => addon !== lengthChoice.id);
      }
      this.addons.push(length.id);
      this.lengthChoice = length;
    },
    handleChooseDesign(design) {
      const { designChoice } = this;
      if (designChoice && designChoice.id === design.id) {
        this.addons = this.addons.filter((addon) => addon !== designChoice.id);
      }
      this.addons.push(design.id);
      this.designChoice = design;
    },
    handleVideoLoaded() {
      this.setPageLoaded(true);
    },
  },
};
</script>

<style lang="scss">
.booking {
  min-height: 100vh;
  width: 100%;
  padding: $headerHeightMobile 9px 0;
  @include bpMedium {
    padding: $headerHeight 9px 0;
  }
  h4 {
    margin-top: 10px;
  }
  .container {
    position: relative;
  }
  .shape-opts {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  &__total {
    width: 100%;
    margin: 81px 0 0 20px;
    z-index: 30;
    &__content {
      width: 100%;
      border: 1px solid black;
      padding: 10px;
      h3 {
        margin: 0 0 10px;
        left: 0;
        text-align: center;
      }
      p {
        display: flex;
        justify-content: space-between;
        margin: 5px 0;
      }
    }
  }
  &__content {
    overflow: hidden;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    padding-bottom: 75px;
    transition: max-width 300ms $easeOutMaterial;
    flex-shrink: 0;
    &.total {
      @include bpMedium {
        max-width: 75%;
      }
    }
    h1 {
      margin: 30px 0 15px;
    }
    .radio {
      margin-left: 15px;
      font-size: 20px;
      display: flex;
      align-items: center;
      position: relative;
      &:first-of-type {
        margin-left: 0;
      }
      &__control {
        width: 20px;
        height: 20px;
        border: 1px solid black;
        margin-right: 10px;
        transition: background 300ms $easeOutMaterial;
      }
      &.active {
        .radio__control {
          background: $hdRed;
        }
      }
      input {
        opacity: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .appointments {
      display: flex;
      justify-content: center;
      width: 100%;
    }
    button {
      cursor: pointer;
      font-family: $headlineFontFamily;
      width: 100%;
      background: none;
      border: 1px solid black;
      padding: 30px 0;
      margin: 0 20px;
      font-size: 30px;
      text-transform: uppercase;
      transition: background 300ms $easeOutMaterial,
                  color 300ms $easeOutMaterial,
                  opacity 300ms $easeOutMaterial;
      &:first-of-type { margin-left: 0; }
      &:last-of-type { margin-right: 0; }
      @include on-hover {
        background: $hdRed;
        color: white;
      }
      &.active {
        background: $hdRed;
        color: white;
      }
      &.inactive {
        opacity: 0.35;
      }
    }
    .screen {
      width: 100%;
      &__content {
        display: flex;
      }
    }
  }
}
</style>
