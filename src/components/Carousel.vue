<template>
  <div class="carousel">
    <div class="carousel__container">
      <div class="carousel__controls" ref="controls">
        <div class="pagination">
          <span
            class="pagination__dot"
            v-for="(image, i) in images"
            :key="image"
            :class="{ active: activeIndex === i }"
          />
        </div>
        <button class="info" v-if="description.length" @click="infoOpen = true;">
          <span class="material-icons">info</span>
        </button>
        <transition name="fade">
          <div class="overlay" v-if="description.length && infoOpen">
            <button class="close" @click="infoOpen = false;">
              <span class="material-icons">close</span>
            </button>
            <p v-for="line in description" :key="line">
              <span v-for="(entry, i) in line" :key="entry" :class="{ line: i !== 0 }">
                <span v-if="i !== 0" class="hyphen"></span>{{entry}}
              </span>
            </p>
          </div>
        </transition>
      </div>
      <div class="carousel__wrapper" :style="wrapperStyle">
        <div class="carousel__wrapper__slide" v-for="(image, index) in images" :key="image">
          <img
            :src="image"
            v-if="activeIndex === index || activeIndex + 1 === index || activeIndex - 1 === index"
          >
        </div>
      </div>
    </div>
    <div class="carousel__base">
      <h1 class="title">{{title}}</h1>
    </div>
  </div>
</template>

<script>
import gsap from 'gsap';
import { mapState } from 'vuex';

export default {
  name: 'Carousel',
  props: {
    items: {
      type: Array,
      required: true,
    },
    cover: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: Array,
      default: () => ([]),
    },
  },
  data: () => ({
    startPos: null,
    clientMove: 0,
    offsetPosition: 0,
    slideWidth: 0,
    activeIndex: 0,
    infoOpen: false,
  }),
  computed: {
    ...mapState(['viewWidth']),
    wrapperStyle() {
      return {
        transform: `translateX(${this.clientMove + this.offsetPosition}px)`,
      };
    },
    totalItems() {
      return this.images.length - 1;
    },
    images() {
      let images = [...this.items];
      if (this.items.length > 9) {
        images = images.sort(() => 0.5 - Math.random());
        images = images.slice(0, 9);
      }
      if (this.cover) images.unshift(this.cover);
      return images;
    },
  },
  watch: {
    activeIndex(val) {
      gsap.to(this, {
        offsetPosition: val * -this.slideWidth,
        clientMove: 0,
      });
    },
    viewWidth() {
      this.handleResize();
      gsap.set(this, {
        offsetPosition: this.activeIndex * -this.slideWidth,
        clientMove: 0,
      });
    },
  },
  mounted() {
    this.bindControls();
    this.$nextTick(() => {
      this.handleResize();
    });
  },
  methods: {
    handleResize() {
      this.slideWidth = this.$refs.controls.clientWidth;
    },
    bindControls() {
      const { controls } = this.$refs;
      controls.addEventListener('mousedown', this.setStartPos);
      controls.addEventListener('touchstart', this.setStartTouchPos);
    },
    clearStartPos() {
      this.startPos = null;
      if (Math.abs(this.clientMove) > 20) {
        if (this.clientMove > 0) {
          if (this.activeIndex === 0) {
            gsap.to(this, {
              clientMove: 0,
            });
          } else {
            this.activeIndex -= 1;
          }
        } else if (this.activeIndex === this.totalItems) {
          gsap.to(this, {
            clientMove: 0,
          });
        } else {
          this.activeIndex += 1;
        }
      }
    },
    setStartPos(e) {
      if (this.infoOpen) return;
      this.startPos = e.clientX;
      document.addEventListener('mouseup', this.clearStartPos);
      document.addEventListener('mousemove', this.handleMove);
    },
    setStartTouchPos(e) {
      if (this.infoOpen) return;
      this.startPos = e.touches[0].clientX;
      document.addEventListener('touchend', this.clearStartPos);
      document.addEventListener('touchmove', this.handleTouchMove, false);
    },
    handleTouchMove(e) {
      if (this.startPos === null) return;
      this.clientMove = -(this.startPos - e.touches[0].clientX);
    },
    handleMove(e) {
      if (this.startPos === null) return;
      this.clientMove = -(this.startPos - e.clientX);
    },
  },
};
</script>

<style lang="scss">
.carousel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  user-select: none;
  margin: 25px 0;
  &__controls {
    position: absolute;
    touch-action: pan-y;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    .info {
      background: none;
      border: none;
      position: absolute;
      bottom: 10px;
      right: 10px;
      .material-icons {
        color: #999;
      }
    }
    .overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 10;
      background: rgba(white, 0.85);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: center;
      flex-direction: column;
      padding: 10px 20px;
      // opacity: 0;
      transition: opacity 300ms $easeOutMaterial;
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #777;
        background: none;
        border: none;
        padding: 0;
      }
      &.visible {
        opacity: 1;
      }
      p {
        color: $hdRed;
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        .line {
          padding-left: 10px;
          position: relative;
          .hyphen {
            position: absolute;
            left: 0;
            top: 12px;
            width: 5px;
            height: 1px;
            content: '';
            background: $hdRed;
          }
        }
      }
    }
    .pagination {
      position: absolute;
      bottom: 15px;
      display: flex;
      justify-content: center;
      width: 100%;
      &__dot {
        width: 7px;
        height: 7px;
        background: #999;
        border-radius: 50%;
        margin: 0 3.5px;
        transition: transform 250ms $easeOutMaterial,
                    background 250ms $easeOutMaterial;
        &.active {
          transform: scale(1.5);
          background: $hdRed;
        }
      }
    }
  }
  &__container {
    overflow: hidden;
    position: relative;
    width: 100%;
  }
  &__wrapper {
    width: 100%;
    display: flex;
    &__slide {
      width: 100%;
      flex-shrink: 0;
      position: relative;
      &::after {
        content: "";
        display: block;
        padding-bottom: 100%;
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  &__base {
    border: 1px solid rgba($hdRed, 0.15);
    border-top: none;
    margin-top: -2px;
    padding: 20px;
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    .title {
      margin: 0;
    }
  }
}
</style>
