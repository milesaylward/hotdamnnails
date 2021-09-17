<template>
  <div class="dates container" ref="dates">
    <h1 class="title">Dates & Times</h1>
    <div class="dates__container">
      <div class="controls" v-if="dates.length > 1">
        <button
          class="controls__control controls__control--prev"
          :class="{ disabled: currentDateIndex === 0 }"
          @click="handleDateControl(-1)"
        >
          <span class="material-icons">arrow_left</span>
        </button>
        <button
          class="controls__control controls__control--next"
          :class="{ disabled: currentDateIndex === dates.length - 1 }"
          @click="handleDateControl(1)"
        >
          <span class="material-icons">arrow_right</span>
        </button>
      </div>
      <div class="dates__container__wrapper">
        <div class="slide" :style="dateSlideStyles">
          <div
            class="dates__date-options"
            v-for="(arr, i) in dates"
            :key="i"
          >
            <button
              class="dates__date-options__date"
              v-for="date in arr"
              @click="$emit('setDate', date)"
              :key="date.date"
              :class="{
                active: activeDate && activeDate.date === date.date,
                inactive: activeDate && activeDate.date !== date.date,
              }"
            >
              <span>{{date.day_of_week}}</span>
              <span class="small">{{date.date}}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in" @enter="$emit('scrollTo', 'times', false)">
      <div class="dates__time-options" v-if="activeDate" :key="activeDate.date" id="times">
        <button
          class="dates__time-options__time"
          v-for="time in activeDate.times"
          :key="time.time"
          :class="{
            active: activeTime && activeTime.time === time.time,
            inactive: activeTime && activeTime.time !== time.time,
          }"
          @click="$emit('setTime', time)"
        >
        {{time.time_parsed}}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Dates',
  props: {
    dates: {
      required: true,
    },
    activeDate: {
      required: true,
    },
    activeTime: {
      required: true,
    },
    dateSize: {
      required: true,
    },
  },
  data: () => ({
    currentDateIndex: 0,
  }),
  computed: {
    dateSlideStyles() {
      return {
        transform: `translateX(${-this.currentDateIndex * 100}%)`,
      };
    },
  },
  methods: {
    handleDateControl(inc) {
      this.currentDateIndex += inc;
    },
  },
};
</script>

<style lang="scss">
.dates {
  &.container {
    padding: 0;
    margin-top: -130px;
    padding-bottom: 200px;
    display: block;
    position: relative;
    z-index: 12;
    @include bpLarge {
      margin-top: -160px;
    }
    &.soak {
      @include bpLarge {
        margin-top: 0;
      }
    }
  }
  h1.title {
    padding: 0 14px;
    @include bpLarge {
      margin-left: 0;
      padding: 0;
    }
  }
  &__container {
    display: flex;
      position: relative;
    &__wrapper {
      overflow: hidden;
      width: calc(100% - 68px);
      @include bpLarge {
        width: 100%;
      }
      margin: 0 auto;
      .slide {
        display: flex;
        margin: 0 auto;
        transition: transform 500ms $easeOutMaterial;
      }
    }
    .controls {
      position: absolute;
      width: calc(100% - 20px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 100%;
      &__control {
        background: none;
        border: 1px solid $darkGrey;
        border-radius: 4px;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 50%;
        padding: 0px;
        width: 24px;
        height: 24px;
        cursor: pointer;
        transition: background 500ms $easeOutMaterial,
                    color 500ms $easeOutMaterial;
        @include bpLarge {
          width: 30px;
          height: 30px;
        }
        @include on-hover {
          background: $darkGrey;
          color: white;
        }
        &.disabled {
          opacity: 0.3;
          pointer-events: none;
        }
        &--prev {
          left: 0px;
          transform: translate(-25%, -50%);
          @include bpLarge {
            transform: translate(-150%, -50%);
          }
        }
        &--next {
          right: 0px;
          transform: translate(25%, -50%);
           @include bpLarge {
            transform: translate(150%, -50%);
          }
        }
      }
    }
  }
  &__date-options {
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    width: 100%;
    &__date {
      width: 25%;
      background: none;
      border: 1px solid $hdRed;
      border-right: none;
      flex-shrink: 0;
      @include bpLarge {
        width: 10%;
      }
      &:last-of-type {
        border-right: 1px solid $hdRed;
      }
      cursor: pointer;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      align-items: center;
      padding: 10px 0;
      transition: background 300ms $easeOutMaterial,
                  color 300ms $easeOutMaterial,
                  opacity 300ms $easeOutMaterial;
      &.active {
        background: $hdRed;
        color: white;
      }
      &.inactive {
        opacity: 0.5;
      }
      @include on-hover {
        background: $hdRed;
        color: white;
      }
    }
  }
  &__time-options {
    $itemHeight: 45px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    max-height: $itemHeight * 5;
    min-height: $itemHeight * 2;
    width: calc(100% - 68px);
    margin: 10px auto 0;
    @include bpLarge {
      width: 100%;
    }
    &__time {
      width: 25%;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      flex: 1 1 auto;
      background: rgba(white, 0);
      border: none;
      color: $darkGrey;
      padding: 0;
      height: $itemHeight;
      max-height: $itemHeight;
      border-radius: 4px;
      transition: background 300ms $easeOutMaterial,
                  opacity 300ms $easeOutMaterial;
      cursor: pointer;
      @include bpLarge {
        width: 10%;
      }
      &.active {
        background: rgba($lightGrey, 0.2);
      }
      &.inactive {
        opacity: 0.4;
      }
      @include on-hover {
        background: rgba($lightGrey, 0.2);
      }
    }
  }
}
</style>
