<template>
  <div id="designs" class="designs">
    <div class="designs__content container">
      <h1>Designs</h1>
      <p class="copy">
        Below are some design examples grouped by the type
        of design you would choose if you were booking.
        As always if you have any confusion booking feel free
        to consult with me on instagram
        <a :href="igLink" target="_blank">@HotDamnNails</a>
      </p>
      <div class="designs__carousels">
        <Carousel
          v-for="(block, index) in carouselBlocks"
          :key="index"
          :items="block.slides"
          :cover="block.cover"
          :title="block.title"
          :description="block.description"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from './Carousel.vue';
import { DESIGN_CAROUSELS } from '@/core/constants';

export default {
  name: 'Designs',
  components: {
    Carousel,
  },
  data: () => ({
    carouselBlocks: DESIGN_CAROUSELS,
  }),
  computed: {
    ...mapGetters(['isIOS', 'isMobile']),
    igLink() {
      if (this.isIOS) return 'instagram://user?username=hotdamnnails';
      if (!this.isMobile) return 'https://www.instagram.com/hotdamnnails/';
      return 'intent://www.instagram.com/hotdamnnails/#Intent;package=com.instagram.android;scheme=https;end';
    },
  },
};
</script>

<style lang="scss">
.designs {
  padding-top: 30px;
  &__content {
    padding: 0 10px;
    h1 {
      text-align: center;
      text-transform: uppercase;
    }
    .copy {
      max-width: 800px;
      text-align: center;
      margin: 20px auto 0;
      padding: 0 14px;
    }
  }
  &__carousels {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .carousel {
      width: 100%;
      max-width: 100%;
      flex-shrink: 0;
      @include bpMedium {
        max-width: 400px;
        margin: 25px;
      }
    }
  }
}
</style>
