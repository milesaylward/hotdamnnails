<template>
  <div
    :class="[
      'appearable',
      {
        'appearable--anim': anim,
        'appearable--text': text,
        'appearable--can-appear': canAppear,
        'appearable--halfway-visible': canAppear
      }
    ]"
  >
    <div ref="container" class="appearable__content">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Appearable',
  props: {
    anim: {
      type: Boolean,
      required: false,
    },
    text: {
      type: Boolean,
      required: false,
    },
    threshold: {
      type: Number,
      required: false,
      default: 0.5,
    },
    thresholdMobile: {
      type: Number,
      required: false,
      default: 0.05,
    },
    debug: {
      type: Boolean,
      required: false,
      default: false,
    },
    noAppear: {
      type: Boolean,
      required: false,
      default: false,
    },
    resetOnLeave: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    halfwayThreshold: 0.5,
    fullyVisibleThreshold: 0.75,
    fullyVisibleThresholdMobile: 0.5,
    fullyVisibleThresholdMobileLandscape: 0.2,
    largerThanThreshold: 0.15,
    appearThresholdReached: false,
    rootMargin: '0px 0px 0px 0px',
    halfwayReached: false,
    fullyVisible: false,
    appearThresholdLocal: [], // container for our values
    appearThresholdFrequency: 0.05, // amount to increment by when populating threshold
  }),
  computed: {
    ...mapGetters(['isMobile']),
    slotWrapperComponent() {
      return !this.noAppear ? 'Intersect' : 'div';
    },
    slotHandleEnter() {
      return this.handleEnter;
    },
    slotHandleLeave() {
      return this.handleLeave;
    },
    canAppear() {
      return this.appearThresholdReached;
    },
    halfwayVisible() {
      return this.halfwayReached;
    },
    isDefaultThreshold() {
      // These should always match defaults in props
      return this.isMobile
        ? this.thresholdMobile === this.fullyVisibleThresholdMobile
        : this.threshold === this.fullyVisibleThreshold;
    },
    appearThresholdArray() {
      return this.appearThresholdLocal;
    },
    parsedThreshold() {
      return this.isMobile ? this.thresholdMobile : this.threshold;
    },
    parsedFullThreshold() {
      return this.isMobile ? this.thresholdMobile : this.threshold;
    },
  },
  created() {
    // Populate source threshold array automagically
    // this.appearThresholdLocal = [0.3, 0.7];
    this.rootMargin = '0px';
    for (let x = 0.0; x < 1; x += this.appearThresholdFrequency) {
      this.appearThresholdLocal.push(Math.round(x * 100) / 100);
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(this.slotHandleEnter, {
      rootMargin: '0px',
      threshold: this.appearThresholdLocal,
    });
    this.observer.observe(this.$refs.container);
  },
  methods: {
    handleEnter(entries) {
      if (entries && entries[0]) {
        const {
          isIntersecting,
          intersectionRatio,
          // rootBounds,
          // boundingClientRect
        } = entries[0];
        if (
          isIntersecting
          && intersectionRatio >= this.parsedThreshold
          && !this.halfwayReached
        ) {
          this.halfwayReached = true;
          this.$emit('halfway-visible', { el: this.$el });
          this.appearThresholdReached = true;
          this.$emit('can-appear', { el: this.$el });
        }
        if (
          isIntersecting
          && intersectionRatio >= this.parsedFullThreshold
          && !this.fullyVisible
        ) {
          this.fullyVisible = true;
          this.$emit('fully-visible', { el: this.$el });
        }
      }
    },
    handleLeave() {
      if (this.resetOnLeave) {
        this.fullyVisible = false;
        this.halfwayReached = false;
      }
      this.$emit('has-left', { el: this.$el });
    },
    emptyHandler() {},
  },
};
</script>

<style lang="scss">
$appearDistance: 30px;
$appearDuration: 0.6s;
$appearEase: cubic-bezier(0.4, 0, 0.2, 1);
$appearableAnimBaseDelay: 0ms;

.appearable {
  &__content {
    width: inherit;
    height: inherit;
  }
  .ap-child {
    opacity: 0;
    transform: translate3d(0, $appearDistance, 0);
    transition: opacity $appearDuration $appearEase,
      transform $appearDuration $appearEase;

    $animStep: 85ms;
    @for $i from 1 through 10 {
      &.#{'ap-child--' + $i} {
        transition-delay: #{$appearableAnimBaseDelay + ($i * $animStep)};
      }
    }
  }
}

.app {
  &.mounted {
    .appearable {
      &.appearable {
        &--can-appear {
          .ap-child {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            &.ap--ignore-transform {
              transform: initial;
            }
          }
        }
      }
    }
  }
}
</style>
