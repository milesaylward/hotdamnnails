<template>
  <div id="designs" class="designs">
    <div class="designs__content container">
      <h1>{{content.title}}</h1>
      <p class="copy" v-html="computedCopy" />
      <div class="designs__carousels">
        <Carousel
          v-for="(block, index) in carouselContent"
          :key="index"
          :items="block.images"
          :title="block.title"
          :description="block.copy"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Carousel from './Carousel.vue';

export default {
  name: 'Designs',
  components: {
    Carousel,
  },
  computed: {
    ...mapGetters(['isIOS', 'isMobile', 'getContentByPath']),
    carouselContent() { return this.getContentByPath('landing.carousels'); },
    content() { return this.getContentByPath('landing.designs'); },
    computedCopy() { return this.replaceString(this.content.copy, this.igLink); },
    igLink() {
      if (this.isIOS) return 'instagram://user?username=hotdamnnails';
      if (!this.isMobile) return 'https://www.instagram.com/hotdamnnails/';
      return 'intent://www.instagram.com/hotdamnnails/#Intent;package=com.instagram.android;scheme=https;end';
    },
  },
  methods: {
    replaceString(string, link) {
      return string.replace(
        /{{(.+?)}}/,
        (match, inner) => `<a href="${link}" target="_blank">${inner}</a>`,
      );
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
