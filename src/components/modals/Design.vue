<template>
  <div class="modal-design" v-if="carousel">
    <div class="modal-design__copy">
      <h1>Please confirm your design choice.</h1>
      <p>Below are some example of <b>{{ modalCopy }}</b> Nails.</p>
    </div>
    <Carousel
      :items="carousel.images"
      :title="carousel.title"
      :description="carousel.copy"
    />
    <div class="modal-design__copy buttons">
      <HDButton copy="Confirm" color="red" @buttonClick="handleConfirm" />
      <HDButton copy="cancel" @buttonClick="handleCancel" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import eventBus from '@/core/eventBus';
import { EVENT_BUS_EVENTS } from '@/core/constants';
import Carousel from '../Carousel.vue';
import HDButton from '../HDButton.vue';

export default {
  name: 'modal-design',
  components: {
    Carousel,
    HDButton,
  },
  data: () => ({
    designIdToCarousel: {
      2112127: 'solid',
      2112131: 'french',
      3305940: 'minimal',
      2112135: 'moderate',
      2551233: 'extreme',
    },
    designIdCopy: {
      2112127: 'classic',
      2112131: 'minimal',
      3305940: 'moderate',
      2112135: 'extreme',
      2551233: 'supreme',
    },
  }),
  computed: {
    ...mapState(['selectedDesign']),
    ...mapGetters(['getContentByPath']),
    carouselContent() { return this.getContentByPath('landing.carousels'); },
    carousel() {
      return this.carouselContent[this.designIdToCarousel[this.selectedDesign]];
    },
    modalCopy() {
      const copy = this.getContentByPath('design_modal');
      return copy[this.designIdCopy[this.selectedDesign]];
    },
  },
  methods: {
    ...mapActions(['closeModal']),
    handleConfirm() {
      eventBus.emit(EVENT_BUS_EVENTS.DESIGN_CONFIRM, this.selectedDesign);
      this.closeModal();
    },
    handleCancel() {
      this.closeModal();
    },
  },
};
</script>

<style lang="scss">
.modal-design {
  .carousel {
    margin: 0;
    &__base {
      display: none;
    }
  }
  &__copy {
    padding: 20px;
    b {
      color: $hdRed;
      text-transform: uppercase;
    }
    &.buttons {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
