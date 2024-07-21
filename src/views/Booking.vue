<template>
  <div class="page booking">
    <Hero
      title="Book with me"
      :video="video.src"
      :fallback="video.fallback"
      @load="handleVideoLoaded"
    />
    <transition name="fade" mode="out-in">
      <BookingPolicy v-if="!policyAccepted" />
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
                <RadioOption
                  :options="preOpts"
                  :multi="isFill"
                  :addons="addons"
                  :copy="preCopy"
                  :choice="preChoice"
                  v-if="preOpts.length && !showButtonOption"
                  @changeOpt="handlePreChange"
                />
                <div v-if="showButtonOption" ref="pre">
                  <h1 v-html="preCopy" />
                  <div class="screen__content">
                    <HDButton
                      v-for="opt in preOpts"
                      :key="opt.id"
                      :class="{
                        'full-width': showButtonOption,
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
                  <div
                    v-if="showShape"
                    ref="shapes"
                  >
                    <h1>Shape</h1>
                    <p class="note" v-if="shapeNote">
                      <b>Note:</b>&nbsp;
                      <span v-html="shapeNote" />
                    </p>
                    <div class="screen__content">
                      <HDButton
                        class="full-width"
                        v-for="opt in shapeOpts"
                        :key="opt.id"
                        @buttonClick="handleChooseShape(opt)"
                        :active="shapeChoice && shapeChoice.id === opt.id"
                        :inactive="shapeChoice && shapeChoice.id !== opt.id"
                        :disabled="inactiveShapes.indexOf(opt.id) > -1"
                        :copy="`${opt.parsed_name}<br>${opt.price}`"
                      />
                    </div>
                  </div>
                </transition>
                <transition name="fade" @enter="!isFill && handleScrollTo('design')">
                  <div
                    v-if="
                      showDesign
                      && designs.length
                    "
                    ref="design"
                  >
                    <h1>Design</h1>
                    <p class="note">
                      <b>Note:</b>&nbsp;
                      <span v-html="designNote" />
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
                  </div>
                </transition>
                <transition name="fade" @enter="handleScrollTo('freestyle')">
                  <div
                    ref="freestyle"
                    v-if="showFreestyle && freestyleOpts.length"
                  >
                    <p class="confirm-inspiration" v-html="inspoCopy" />
                    <div class="screen__content">
                      <HDButton
                        v-for="opt in freestyleOpts"
                        class="full-width"
                        :key="opt.id"
                        @buttonClick="handleChooseFreestyle(opt)"
                        :active="freestyleChoice && freestyleChoice.id === opt.id"
                        :inactive="freestyleChoice && freestyleChoice.id !== opt.id"
                        :copy="opt.parsed_name"
                      />
                    </div>
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
            :class="{ soak: isSoakOff }"
            ref="dates"
            v-if="computedDates.length"
            :activeDate="activeDate"
            :dates="computedDates"
            :viewAfterHours="viewAfterHours"
            :canShowAfterHours="canShowAfterHours"
            :dateSize="dateSize"
            :activeTime="activeTime"
            @setDate="setActiveDate"
            @setTime="setSelectedTime"
            @scrollTo="handleScrollTo"
            @afterHoursChange="handleAfterHoursChange"
          />
          <div class="container main main--sub" v-else-if="noDates" ref="dates">
            <h3>
              Sorry there are no appointmentes available at this time.
            </h3>
          </div>
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
    <BookingError />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import eventBus from '@/core/eventBus';
import Hero from '@/components/Hero.vue';
import UserForm from '@/components/UserForm.vue';
import RadioOption from '@/components/RadioOption.vue';
import HDButton from '@/components/HDButton.vue';
import Total from '@/components/Total.vue';
import Dates from '@/components/Dates.vue';
import BookingLoader from '@/components/BookingLoader.vue';
import BookingPolicy from '@/components/BookingPolicy.vue';
import BookingSuccess from '@/components/BookingSuccess.vue';
import BookingError from '@/components/BookingError.vue';
import { EVENT_BUS_EVENTS, MODAL_TYPES } from '../core/constants';

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
    BookingError,
  },
  data: () => ({
    fallback: true,
    currentStep: 0,
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
    viewAfterHours: false,
  }),
  computed: {
    ...mapState([
      'appointmentData',
      'availableDates',
      'datesLoading',
      'bookingLoading',
      'bookingSuccess',
      'noDates',
      'policyAccepted',
    ]),
    ...mapGetters(['isLarge', 'getContentByPath', 'getItemHtml']),
    content() {
      return this.getContentByPath('booking');
    },
    video() {
      return {
        src: this.getContentByPath('booking.video'),
        fallback: this.getContentByPath('booking.video_fallback'),
      };
    },
    designNote() {
      return this.getContentByPath('booking.design_note');
    },
    preCopy() {
      if (!this.appointmentType) return '';
      if (this.showButtonOption) return 'Do you need a removal?<br><small>(I do not offer acrylic or dip soak offs)</small>';
      if (this.isFill) return 'Please check all that apply for your fill in:';
      return '';
    },
    isXLongGelExtension() {
      return this.lengthChoice && this.lengthChoice.id === 2577740;
    },
    isLongGelExtension() {
      return this.lengthChoice && this.lengthChoice.id === 2577728;
    },
    showDesign() {
      if (this.isDesignOnly || this.shapeChoice) return true;
      if ((this.isGel || this.isPolyGelMani || this.isFill)) return !!this.preChoice;
    },
    shapeNote() {
      let note;
      if (this.isGelExtension) {
        if (this.isXLongGelExtension) note = this.getContentByPath('booking.gelex.xlong_note');
        if (this.isLongGelExtension) note = this.getContentByPath('booking.gelex.long_note');
      }
      return note;
    },
    inactiveShapes() {
      if (this.isGelExtension) {
        if (this.isXLongGelExtension) return [2577745, 2577744, 2577746];
        if (this.isLongGelExtension) return [2577745, 2577746];
      }
      return [];
    },
    isFresh() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 26099563;
    },
    isGel() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 27823191;
    },
    isGelExtension() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 30936228;
    },
    isPolyGel() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 42337457;
    },
    isPolyGelMani() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 42966671;
    },
    isDesignOnly() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 65769632;
    },
    preRequired() {
      return this.isFresh || this.isGel || this.isFill;
    },
    isFill() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 26100150;
    },
    isSoakOff() {
      if (!this.appointmentType) return false;
      return this.appointmentType.id === 26100539;
    },
    showFreestyle() {
      return this.designChoice && this.designChoice.id !== 2166634;
    },
    datesToShow() {
      return this.isLarge ? 10 : 4;
    },
    computedDates() {
      const { availableDates } = this;
      if (!availableDates) return [];
      const arrayOfArrays = [];
      const datesSelected = !this.viewAfterHours
        ? availableDates.filter((date) => date.normal_hours.length > 0)
        : availableDates.filter((date) => date.after_hours.length > 0);
      for (let i = 0; i < datesSelected.length; i += this.datesToShow) {
        arrayOfArrays.push(datesSelected.slice(i, i + this.datesToShow));
      }
      return arrayOfArrays;
    },
    canShowAfterHours() {
      const { availableDates } = this;
      if (!availableDates) return false;
      const afterHours = availableDates.filter((date) => date.after_hours.length > 0);
      return afterHours.length > 0 && this.afterHoursOpts.length;
    },
    shapeOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.shape_opts;
      return opts.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    preOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.pre_opts;
      return opts.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    freestyleOpts() {
      if (!this.appointmentType) return [];
      const opts = this.appointmentType.freestyle_opts;
      return opts.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    afterHoursOpts() {
      if (!this.appointmentType) return [];
      return this.appointmentType.after_hours_opts;
    },
    lengths() {
      if (!this.appointmentType) return [];
      const lengths = this.appointmentType.length_opts;
      return lengths.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    fillTimes() {
      if (!this.appointmentType) return [];
      const times = this.appointmentType.fill_time_opts;
      return times.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    designs() {
      if (!this.appointmentType) return [];
      const designs = this.appointmentType.designs_opts;
      return designs.sort((a, b) => {
        if (a.price !== b.price) return a.price - b.price;
        return a.parsed_name.localeCompare(b.parsed_name);
      });
    },
    canShowTotal() {
      if (this.isFresh || this.isGelExtension || this.isPolyGel) {
        return this.preChoice
          && this.lengthChoice && this.designChoice
          && ((this.freestyleChoice && this.showFreestyle) || !this.showFreestyle);
      }
      if (this.isFill) {
        return this.designChoice
          && ((this.freestyleChoice && this.showFreestyle) || !this.showFreestyle);
      }
      if (this.isGel || this.isPolyGelMani) {
        return this.designChoice
          && ((this.freestyleChoice && this.showFreestyle) || !this.showFreestyle);
      }
      if (this.isDesignOnly) return this.designChoice;
      return this.isSoakOff;
    },
    showButtonOption() {
      return this.isFresh
        || this.isGel
        || this.isGelExtension
        || this.isPolyGel
        || this.isPolyGelMani;
    },
    showShape() {
      return (this.lengthChoice
        && (this.isFresh || this.isGelExtension || this.isPolyGel))
        && this.shapeOpts.length;
    },
    inspoCopy() {
      return this.getItemHtml(this.content.inspiration_note);
    },
  },
  watch: {
    addons: {
      deep: true,
      handler() {
        if (!this.ignoreChange) {
          this.clearAvailableDates();
          this.viewAfterHours = false;
          this.showUserForm = false;
        } else {
          this.ignoreChange = false;
        }
      },
    },
    computedDates: {
      handler(val) {
        if (val.length) [[this.activeDate]] = val;
      },
      deep: true,
    },
  },
  mounted() {
    eventBus.on(EVENT_BUS_EVENTS.DESIGN_CONFIRM, this.handleConfirmDesign);
  },
  beforeUnmount() {
    eventBus.off(EVENT_BUS_EVENTS.DESIGN_CONFIRM, this.handleConfirmDesign);
    this.resetOpts();
  },
  methods: {
    ...mapActions([
      'setPageLoaded',
      'getAvailableDates',
      'bookAppointment',
      'clearAvailableDates',
      'openModal',
      'setSelectedDesign',
    ]),
    handleAfterHoursChange(val) {
      this.viewAfterHours = val;
      this.activeTime = null;
      this.showUserForm = false;
      this.ignoreChange = true;
      this.addons = this.addons.filter(
        (addon) => addon.id !== this.afterHoursOpts[0].id,
      );
    },
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
      const rect = el.getBoundingClientRect();
      const offset = window.innerWidth > 767 ? 85 : 65;
      window.scrollTo({ top: window.scrollY + (rect.top - offset), behavior: 'smooth' });
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
      if (time.after_hours) {
        this.ignoreChange = true;
        this.addons.push(this.afterHoursOpts[0]);
      }
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
      const noChangeId = 3650951;
      const { preChoice, showButtonOption } = this;
      if (showButtonOption) {
        if (preChoice) {
          this.addons = this.addons.filter((opt) => opt.id !== preChoice.id);
        }
        this.addons.push(pre);
        this.preChoice = pre;
      } else {
        const index = this.addons.findIndex((opt) => opt.id === pre.id);
        if (index > -1) {
          this.addons = this.addons.filter((opt) => opt.id !== pre.id);
          if (this.preChoice.id === pre.id) {
            const preOpts = this.addons.filter((opt) => opt.name.startsWith('Pre:'));
            if (!preOpts.length) this.preChoice = null;
            else this.preChoice = preOpts[0];
          }
        } else {
          this.addons.push(pre);
          if (pre.id === noChangeId) {
            this.addons = this.addons.filter((opt) => {
              if (opt.name.startsWith('Pre:') && opt.id !== noChangeId) return false;
              return true;
            });
          } else {
            this.addons = this.addons.filter((opt) => opt.id !== noChangeId);
          }
          this.preChoice = pre;
        }
      }
    },
    handleChooseType(type) {
      this.appointmentType = type;
      // this.resetOpts();
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
      this.setSelectedDesign(design.id);
      this.openModal(MODAL_TYPES.DESIGN_CONFIRM);
    },
    handleConfirmDesign(designId) {
      const { designChoice } = this;
      if (designChoice) {
        this.addons = this.addons.filter((opt) => opt.id !== designChoice.id);
      }
      const newDesign = this.designs.find((design) => design.id === designId);
      this.addons.push(newDesign);
      this.designChoice = newDesign;
      setTimeout(() => { this.handleChooseFreestyle(); }, 550);
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
      &--sub {
        margin-top: -100px;
      }
    }
  }
  .note {
    margin: 10px 0;
    padding: 0 14px;
    b {
      color: $hdRed;
    }
    @include bpLarge {
      padding: {
        left: 0;
      }
    }
  }
  .confirm-inspiration {
    color: $hdRed;
    text-transform: uppercase;
    font-weight: normal;
    padding: 25px 14px 14px;
    font-style: italic;
    @include bpLarge {
      padding: {
        left: 0;
      }
    }
    a {
      color: $hdRed;
      font-style: italic;
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
    line-height: 1;
    small {
      font-size: 60%;
      font-weight: 400;
      color: #777;
    }
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
      padding: 20px 10px;
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
      h1 {
        .small {
          font-size: 18px;
        }
      }
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
