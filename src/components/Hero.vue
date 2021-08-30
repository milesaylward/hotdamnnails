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
    playsinline
    muted
    autoplay
    loop
    @play="showFallback = false;"
    @canplay="$emit('load')"
  />
  <img :src="fallback" v-if="showFallback">
  <Drip class="hero__border" />
</div>
</template>

<script>
import Drip from '@/assets/svg/drip.svg';

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
    z-index: 1;
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
  }
  img {
    position: absolute;
  }
  &__overlay {
    background: rgba(#000, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
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
