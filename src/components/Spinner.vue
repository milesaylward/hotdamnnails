<template>
  <svg class="circular" :style="containerStyles">
    <circle
      class="path"
      :cx="size"
      :cy="size"
      :r="size / 2"
      fill="none"
      stroke-width="2"
      stroke-miterlimit="10"
    />
  </svg>
</template>

<script>
export default {
  name: 'Spinner',
  props: {
    size: {
      default: 20,
    },
  },
  computed: {
    containerStyles() {
      return { height: `${this.size * 2}px`, width: `${this.size * 2}px` };
    },
  },
};
</script>

<style lang="scss">
.circular {
  animation: rotate 2.5s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.path {
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
  animation:
   dash 2.5s ease-in-out infinite,
   color 6s ease-in-out infinite;
  stroke-linecap: round;
  stroke: $hdRed;
}

@keyframes rotate {
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes dash{
  0% {
    stroke-dasharray: 1,200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89,200;
    stroke-dashoffset: -124;
  }
}
</style>
