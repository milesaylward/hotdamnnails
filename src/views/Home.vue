<template>
  <div class="page page--home home">
    <div class="hero" :style="{ height: heroHeight }">
      <div class="hero__overlay" />
      <video
        :src="content.video"
        ref="video"
        playsinline
        muted
        autoplay
        loop
        @play="fallback = false;"
        @canplay="handleVideoLoaded"
      />
      <img :src="content.fallback" v-if="fallback">
      <div class="hero__content">
        <Appearable>
          <Logo class="hero__logo ap-child" />
          <div class="scroll-prompt ap-child ap-child--2">
            <h4>{{content.scroll}}</h4>
            <button class="scroll-prompt__button" @click="scrollToPricing">
              <Arrow />
            </button>
          </div>
        </Appearable>
      </div>
      <Drip class="hero__drip" />
    </div>
    <Pricing />
  </div>
</template>

<script>
import Logo from '@/assets/svg/logo.svg';
import Arrow from '@/assets/svg/down_arrow.svg';
import Drip from '@/assets/svg/drip.svg';
import Pricing from '@/components/Pricing.vue';
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from '@/core/constants';
import { mapActions, mapGetters, mapState } from 'vuex';
import EventBus from '@/core/eventBus';

export default {
  name: 'Home',
  components: {
    Logo,
    Arrow,
    Pricing,
    Drip,
  },
  data: () => ({
    fallback: true,
  }),
  computed: {
    ...mapGetters(['getContentByPath', 'isMobile']),
    ...mapState(['viewHeight']),
    heroHeight() {
      return `${this.viewHeight - (this.offset * 1.5)}px`;
    },
    offset() {
      return this.isMobile ? HEADER_HEIGHT_MOBILE : HEADER_HEIGHT;
    },
    content() {
      return this.getContentByPath('landing');
    },
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.hash === '#pricing') {
          this.$nextTick(() => { this.scrollToPricing(); });
        }
      },
    },
  },
  mounted() {
    EventBus.on('scrollToPricing', this.scrollToPricing);
    EventBus.on('scrollToTop', this.scrollToTop);
  },
  methods: {
    ...mapActions(['setPageLoaded']),
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    scrollToPricing() {
      let position = document.getElementById('pricing').getBoundingClientRect().top - this.offset;
      const bodyTop = window.pageYOffset
                      || document.documentElement.scrollTop
                      || document.body.scrollTop || 0;
      position += bodyTop;
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    },
    handleVideoLoaded() {
      this.setPageLoaded(true);
    },
  },
};
</script>

<style lang="scss">
.home {
  display: block;
  .hero {
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    &__drip {
      position: absolute;
      bottom: -10px;
      left: 49%;
      width: 110%;
      transform: translate(-50%, 0) scaleY(-1);
      z-index: 1;
      fill: white;
      height: 75px;
      pointer-events: none;
      @include bpMedium {
        height: 200px;
      }
    }
    &__overlay {
      background: rgba(#fff, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }
    &__content {
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .appearable {
        width: 100%;
        height: 100%;
        &__content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    &__logo {
      display: flex;
      width: 75%;
      max-width: 400px;
      margin-top: 25%;
      @include bpMedium {
        margin-top: 10%;
      }
    }
    video, img {
      display: block;
      width: 110%;
      object-fit: cover;
      object-position: center;
      margin-left: 10%;
    }
    img {
      position: absolute;
      z-index: 1;
    }
    .scroll-prompt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 75px;
      @include bpMedium {
        margin-bottom: 125px;
      }
      text-align: center;
      h4 {
        text-transform: uppercase;
        font-size: 24px;
        color: $white;
        margin-bottom: 25px;
      }
      &__button {
        position: relative;
        border: 1px solid $white;
        background: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          margin-top: 1px;
          width: 20px;
          position: relative;
          z-index: 3;
        }
        &::before, &::after {
          content: '';
          background: white;
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: .5;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 1;
        }
        &::after {
          width: 70px;
          height: 70px;
          animation: pulse 1.5s $easeOutMaterial infinite;
          transform-origin: center center;
        }
      }
    }
  }
  .container {
    display: block;
    height: 100%;
    .logo {
      max-width: 450px;
      margin-bottom: 4rem;
    }
    .links {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .link {
      width: 50%;
      max-width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      margin: 0 10px;
      border: 1px solid $black;
      border-radius: 4px;
      padding: .75rem 2rem;
      color: $black;
      background: $white;
      text-decoration: none;
      font-family: $headlineFontFamily;
      text-transform: uppercase;
      font-size: 24px;
      transition:
        background 250ms $easeOutMaterial,
        color 250ms $easeOutMaterial,
        border-color 250ms $easeOutMaterial;
      &:hover {
        background: $hdRed;
        border-color: $hdRed;
        color: white;
      }
    }
  }
}
</style>
