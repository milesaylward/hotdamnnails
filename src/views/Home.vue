<template>
  <div class="page page--home home">
    <div class="hero">
      <div class="hero__overlay" />
      <video
        :src="content.video"
        playsinline
        muted
        autoplay
        loop
        @canplay="handleVideoLoaded"
      />
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
      <div class="hero__border"></div>
      <div class="hero__border hero__border--right"></div>
    </div>
    <Pricing />
  </div>
</template>

<script>
import Logo from '@/assets/svg/logo.svg';
import Arrow from '@/assets/svg/down_arrow.svg';
import background from '@/assets/images/background.mp4';
import Pricing from '@/components/Pricing.vue';
import { HEADER_HEIGHT } from '@/core/constants';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    Logo,
    Arrow,
    Pricing,
  },
  data: () => ({
    background,
  }),
  computed: {
    ...mapGetters(['getContentByPath']),
    offset() {
      return HEADER_HEIGHT;
    },
    content() {
      return this.getContentByPath('landing');
    },
  },
  methods: {
    ...mapActions(['setPageLoaded']),
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
    height: calc(100vh - #{$headerHeight});
    display: flex;
    align-content: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    &__border {
      @include checkeredBorder;
      &--right {
        @include checkeredBorder(false);
        transform-origin: top right;
        transform: rotate(-90deg) translate(-100%, -10px) scaleX(-1);
        left: auto;
        right: 0;
      }
    }
    &__overlay {
      background: rgba(#fff, 0.3);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__content {
      position: absolute;
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
    video {
      display: block;
      width: 110%;
      object-fit: cover;
      object-position: center;
      margin-left: 10%;
    }
    .scroll-prompt {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
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
        svg {
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
