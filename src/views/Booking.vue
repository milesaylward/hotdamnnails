<template>
  <div class="page booking">
    <Hero
      title="Book with me"
      video="https://dl.airtable.com/.attachments/dda1f57a1256a5082a9a1267a89993d0/a3a6c324/policy_cover.mp4"
      fallback="https://dl.airtable.com/.attachments/02217580f492a317fcf7ddf2d4f5e450/492d60b1/policy_fallback.jpeg"
      @load="handleVideoLoaded"
    />
    <transition name="fade" mode="out-in">
      <BookingPolicy
        @accept="policyAccepted = true;"
        v-if="!policyAccepted"
      />
      <div class="booking__wrapper" v-else-if="!bookingSuccess && policyAccepted">
        <div class="container main" ref="root">
          <div class="booking__content" :class="{ 'booking__content--total': appointmentType }">
            <h1>Services</h1>
            <div class="appointments" ref="types">
              <HDButton
                class="appointments__button"
                @buttonClick="handleChooseType(appt)"
                v-for="appt in appointmentData"
                :active="appointmentType && appointmentType.name === appt.name"
                :inactive="appointmentType && appointmentType.name !== appt.name"
                :copy="appt.name"
                :key="appt.id"
              />
            </div>
            <transition name="fade" mode="out-in" @enter="handleScrollTo('screen')">
              <div class="screen" v-if="appointmentType" :key="appointmentType.id" ref="screen">
                <p v-if="isSoakOff" class="note">
                  <b>Note:</b>
                  I do not do only soak offs on foreign nails (not done by me).
                  I will soak off foreign nails if you book a fresh set!
                </p>
                <RadioOption
                  :options="preOpts"
                  :multi="isFill"
                  :addons="addons"
                  :copy="preCopy"
                  :choice="preChoice"
                  v-if="preOpts.length && !isFresh && !isGel"
                  @changeOpt="handlePreChange"
                />
                <div v-if="isFresh || isGel" ref="pre">
                  <h1>{{preCopy}}</h1>
                  <div class="screen__content">
                    <HDButton
                      v-for="opt in preOpts"
                      :key="opt.id"
                      :class="{
                        'full-width': isGel,
                      }"
                      @buttonClick="handlePreChange(opt)"
                      :active="preChoice && preChoice.id === opt.id"
                      :inactive="preChoice && preChoice.id !== opt.id"
                      :copy="`${opt.parsed_name}<br>${opt.price}`"
                    />
                  </div>
                </div>
                <transition name="fade" @enter="handleScrollTo('length')">
                  <div v-if="preChoice && lengths.length" ref="length">
                    <h1>Length</h1>
                    <div class="screen__content">
                      <HDButton
                        v-for="length in lengths"
                        :key="length.id"
                        @buttonClick="handleChooseLength(length)"
                        :active="lengthChoice && lengthChoice.id === length.id"
                        :inactive="lengthChoice && lengthChoice.id !== length.id"
                        :copy="`${length.parsed_name}<br>${length.price}`"
                      />
                    </div>
                  </div>
                </transition>
                <transition name="fade" @enter="handleScrollTo('shapes')">
                  <div v-if="(lengthChoice && isFresh) && shapeOpts.length" ref="shapes">
                    <h1>Shape</h1>
                    <div class="screen__content">
                      <HDButton
                        class="full-width"
                        v-for="opt in shapeOpts"
                        :key="opt.id"
                        @buttonClick="handleChooseShape(opt)"
                        :active="shapeChoice && shapeChoice.id === opt.id"
                        :inactive="shapeChoice && shapeChoice.id !== opt.id"
                        :copy="`${opt.parsed_name}<br>${opt.price}`"
                      />
                    </div>
                  </div>
                </transition>
                <transition name="fade" @enter="!isFill && handleScrollTo('design')">
                  <div
                    v-if="(shapeChoice || (isGel && preChoice) || isFill) && designs.length"
                    ref="design"
                  >
                    <h1>Design</h1>
                    <p class="note">
                      <b>Note:</b>
                      Design is the most important factor in appointment length & price.
                      If you're are unsure what to book please consult first.<br>
                      Basic does not include accent nails, please choose at least minimal
                      if you'd like any accent nails.<br>
                      Check HD Nails Freestyle if you do not have design inspiration or if
                      you’d like a unique freestyle in that category.
                    </p>
                    <div class="screen__content" v-if="designs.length">
                      <HDButton
                        v-for="design in designs"
                        class="full-width"
                        :key="design.id"
                        @buttonClick="handleChooseDesign(design)"
                        :active="designChoice && designChoice.id === design.id"
                        :inactive="designChoice && designChoice.id !== design.id"
                        :copy="`${design.parsed_name}<br>${design.price}`"
                      />
                    </div>
                    <RadioOption
                      v-if="!designChoice || designChoice.id !== designs[0].id"
                      :options="freestyleOpts"
                      :choice="freestyleChoice"
                      @changeOpt="handleChooseFreestyle"
                    />
                  </div>
                </transition>
              </div>
            </transition>
          </div>
          <transition name="fade">
            <Total
              v-show="appointmentType"
              :type="appointmentType"
              :canShowTotal="canShowTotal"
              :loading="datesLoading"
              :disabled="computedDates.length"
              :options="addons"
              @checkAvailability="checkAvailability"
            />
          </transition>
        </div>
        <transition name="fade" @enter="handleScrollTo('dates')">
          <Dates
            ref="dates"
            v-if="computedDates.length"
            :activeDate="activeDate"
            :dates="computedDates"
            :dateSize="dateSize"
            :activeTime="activeTime"
            @setDate="setActiveDate"
            @setTime="setSelectedTime"
            @scrollTo="handleScrollTo"
          />
        </transition>
        <transition name="fade" @enter="handleScrollTo('form')">
          <div class="container main" v-if="showUserForm" ref="form">
            <UserForm @book="handleBookUser" />
          </div>
        </transition>
      </div>
      <BookingSuccess v-else />
    </transition>
    <transition name="fade">
      <BookingLoader v-if="bookingLoading" />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Hero from '@/components/Hero.vue';
import UserForm from '@/components/UserForm.vue';
import RadioOption from '@/components/RadioOption.vue';
import HDButton from '@/components/HDButton.vue';
import Total from '@/components/Total.vue';
import Dates from '@/components/Dates.vue';
import BookingLoader from '@/components/BookingLoader.vue';
import BookingPolicy from '@/components/BookingPolicy.vue';
import BookingSuccess from '@/components/BookingSuccess.vue';

export default {
  name: 'Booking',
  components: {
    Hero,
    Total,
    UserForm,
    RadioOption,
    HDButton,
    Dates,
    BookingLoader,
    BookingSuccess,
    BookingPolicy,
  },
  data: () => ({
    fallback: true,
    currentStep: 0,
    policyAccepted: false,
    appointmentType: null,
    addons: [],
    selected: [],
    soakOff: null,
    showUserForm: false,
    lengthChoice: null,
    designChoice: null,
    userInfo: {
      number: '',
      name: '',
      email: '',
    },
    dateSize: 0,
    dateMaxWidth: 0,
    currentDateIndex: 0,
    freestyleChoice: null,
    preChoice: null,
    shapeChoice: null,
    activeDate: null,
    activeTime: null,
    totalSteps: 0,
  }),
  computed: {
    ...mapState([
      'appointmentData',
      'availableDates',
      'datesLoading',
      'bookingLoading',
      'bookingSuccess',
    ]),
    ...mapGetters(['isLarge']),
    preCopy() {
      if (!this.appointmentType) return '';
      if (this.isFresh) return 'Do you need a Soak Off?';
      if (this.isFill) return 'Please check all that apply for your fill in:';
      if (this.isGel) return 'SELECT WHAT YOU NEED DONE PLEASE';
      return '';
    },
    isFresh() {
      if (!this.appointmentType) return false;
      return this.appointmentType.name === 'Fresh Set';
    },
    isGel() {
      if (!this.appointmentType) return false;
      return this.appointmentType.name === 'Gel Manicure';
    },
    preRequired() {
      return this.isFresh || this.isGel;
    },
    isFill() {
      if (!this.appointmentType) return false;
      return this.appointmentType.name === 'Fills';
    },
    isSoakOff() {
      if (!this.appointmentType) return false;
      return this.appointmentType.name === 'Soak Off Only';
    },
    datesToShow() {
      return this.isLarge ? 10 : 4;
    },
    computedDates() {
      const { availableDates } = this;
      if (!availableDates) return [];
      const arrayOfArrays = [];
      for (let i = 0; i < availableDates.length; i += this.datesToShow) {
        arrayOfArrays.push(availableDates.slice(i, i + this.datesToShow));
      }
      return arrayOfArrays;
    },
    shapeOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.shape_opts;
      return opts.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    preOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.pre_opts;
      return opts.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    freestyleOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.freestyle_opts;
      return opts.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    lengths() {
      if (!this.appointmentType) return [];
      const lengths = this.appointmentType.length_opts;
      return lengths.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    fillTimes() {
      if (!this.appointmentType) return [];
      const times = this.appointmentType.fill_time_opts;
      return times.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    designs() {
      if (!this.appointmentType) return [];
      const designs = this.appointmentType.designs_opts;
      return designs.sort((a, b) => { if (a.price > b.price) return 1; return -1; });
    },
    canShowTotal() {
      if (this.isFresh) return this.preChoice && this.lengthChoice && this.designChoice;
      if (this.isFill) return this.designChoice;
      if (this.isGel) return this.designChoice;
      return this.isSoakOff;
    },
  },
  watch: {
    addons: {
      deep: true,
      handler() {
        this.clearAvailableDates();
        this.showUserForm = false;
      },
    },
    computedDates: {
      handler(val) {
        if (val.length) [[this.activeDate]] = val;
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions([
      'setPageLoaded',
      'getAvailableDates',
      'bookAppointment',
      'clearAvailableDates',
    ]),
    handleBookUser(user) {
      const addons = this.addons.map((addon) => addon.id);
      const data = {
        user,
        ...this.appointmentType,
        addons,
        time: this.activeTime,
      };
      this.bookAppointment(data);
    },
    handleScrollTo(id, isRef = true) {
      let el;
      if (isRef) el = this.$refs[id].$el || this.$refs[id];
      else el = document.getElementById(id);
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    },
    checkAvailability() {
      const addons = this.addons.map((addon) => addon.id);
      this.getAvailableDates({ addons, appointment: this.appointmentType });
    },
    setActiveDate(date) {
      this.activeDate = date;
      this.activeTime = null;
      this.showUserForm = false;
    },
    setSelectedTime(time) {
      this.activeTime = time;
      this.showUserForm = true;
    },
    resetOpts() {
      this.addons = [];
      this.designChoice = null;
      this.lengthChoice = null;
      this.shapeChoice = null;
      this.preChoice = null;
      this.freestyleChoice = null;
      this.activeTime = null;
      this.activeDate = null;
      this.showUserForm = false;
      this.clearAvailableDates();
    },
    handleChooseShape(shape) {
      const { shapeChoice } = this;
      if (shapeChoice) {
        this.addons = this.addons.filter((opt) => opt.id !== shapeChoice.id);
      }
      this.addons.push(shape);
      this.shapeChoice = shape;
    },
    handlePreChange(pre) {
      const { preChoice, preRequired } = this;
      if (preChoice || !preRequired) {
        if (preRequired) this.addons = this.addons.filter((opt) => opt.id !== preChoice.id);
        if (!preRequired && this.addons.indexOf(pre) > -1) {
          this.addons = this.addons.filter((opt) => opt.id !== pre.id);
          this.preChoice = null;
          return;
        }
      }
      this.addons.push(pre);
      this.preChoice = pre;
    },
    handleChooseType(type) {
      this.appointmentType = type;
      this.resetOpts();
    },
    handleChooseLength(length) {
      const { lengthChoice } = this;
      if (lengthChoice) {
        this.addons = this.addons.filter((opt) => opt.id !== lengthChoice.id);
      }
      this.addons.push(length);
      this.lengthChoice = length;
    },
    handleChooseFreestyle(freestyle) {
      const { freestyleChoice } = this;
      if (freestyleChoice) {
        this.addons = this.addons.filter((opt) => opt.id !== freestyleChoice.id);
        this.freestyleChoice = null;
      } else if (freestyle) {
        this.addons.push(freestyle);
        this.freestyleChoice = freestyle;
      }
    },
    handleChooseDesign(design) {
      const { designChoice } = this;
      if (designChoice) {
        this.addons = this.addons.filter((opt) => opt.id !== designChoice.id);
      }
      this.addons.push(design);
      this.designChoice = design;
      this.handleChooseFreestyle();
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
  padding: $headerHeightMobile 5px 0;
  @include bpMedium {
    padding: $headerHeight 5px 0;
  }
  h4 {
    margin-top: 10px;
  }
  &__wrapper {
    margin-top: 20px;
    .main {
      position: relative;
      padding: 0;
    }
  }
  .note {
    margin: 10px 0;
    padding: 0 14px;
    b {
      color: $hdRed;
    }
  }
  .shape-opts {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  h1 {
    text-transform: uppercase;
    font-size: 24px;
    margin: 0 0 15px;
    padding: 25px 14px 0;
    @include bpLarge {
      padding: {
        left: 0;
      }
    }
  }
  &__content {
    overflow: hidden;
    position: relative;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
    transition: max-width 300ms $easeOutMaterial;
    flex-shrink: 0;
    &--total {
      @include bpLarge {
        max-width: 75%;
      }
    }
    .appointments {
      display: flex;
      justify-content: space-between;
      width: 100%;
      flex-wrap: wrap;
      @include bpLarge {
        flex-wrap: nowrap;
        justify-content: flex-start;
      }
    }
    .hd-button {
      width: calc(50% - 8px);
      padding: 20px 0;
      margin: 4px;
      &.full-width {
        width: 100%;
        @include bpLarge {
          width: 50%;
        }
      }
      @include bpLarge {
        width: 25%;
        margin: 0 10px;
        &:first-of-type { margin-left: 0; }
        &:last-of-type { margin-right: 0; }
      }
    }
    .hd-spinner-button {
      margin: 15px 0;
    }
    .screen {
      width: 100%;
      padding-bottom: 200px;
      &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        @include bpLarge {
          flex-wrap: nowrap;
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
