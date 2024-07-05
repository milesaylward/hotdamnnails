<template>
<div class="hero">
  <div class="hero__content">
    <Appearable>
      <h1>{{title}}</h1>
    </Appearable>
  </div>
  <div class="hero__overlay" />
  <video
    :src="video"
    ref="video"
    playsinline
    muted
    autoplay
    loop
    @play="handleVideoPlayed"
    @pause="handleSuspend"
    @suspend="handleSuspend"
    @canplay="$emit('load')"
  />
  <img :src="fallback" v-if="showFallback">
  <Drip class="hero__border" />
</div>
</template>

<script>
import Drip from '@/assets/svg/drip.svg?component';

export default {
  name: 'Hero',
  components: {
    Drip,
  },
  props: {
    video: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: '',
    },
    fallback: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    showFallback: true,
  }),
  methods: {
    handleSuspend() {
      if (this.$refs.video) {
        this.showFallback = this.$refs.video.paused;
      }
    },
    handleVideoPlayed() {
      this.showFallback = false;
    },
  },
};
</script>

<style lang="scss">
.hero {
  width: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  height: 150px;
  @include bpMedium {
    height: 300px;
  }
  &__border {
    position: absolute;
    bottom: -10px;
    left: 49%;
    width: 110%;
    transform: translate(-50%, 0) scaleY(-1);
    z-index: 4;
    fill: white;
    height: 75px;
    @include bpMedium {
      height: 200px;
    }
  }
  video, img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  img {
    position: absolute;
    z-index: 2;
  }
  &__overlay {
    background: rgba(#000, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 4;
    .appearable {
      width: 100%;
      height: 100%;
      &__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h1 {
          font-size: 26px;
          text-transform: uppercase;
          color: white;
          margin-bottom: 10%;
          @include bpMedium {
            margin-bottom: 5%;
            font-size: 40px;
          }
        }
      }
    }
  }
}
</style>
