<template>
  <div class="booking-error" :class="{ visible: bookingError }">
    <div class="booking-error__error">
      <p>
        <span v-if="bookingErrorBlocked">
          You cannot book at this time, reason:
        </span>
        {{bookingErrorCopy}}.
        <span v-if="bookingErrorBlocked">
          Reach out to me on
          <a href="https://instagram.com/hotdamnnails" target="_blank">Instagram</a>
          if you have questions or think this is a mistake.
        </span>
      </p>
      <button class="booking-error__error__close" @click="handleClose">
        <span class="material-icons">close</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'BookingError',
  computed: {
    ...mapState([
      'bookingErrorCopy',
      'bookingErrorBlocked',
      'bookingError',
    ]),
  },
  methods: {
    ...mapActions(['clearBookingError']),
    handleClose() {
      this.clearBookingError();
    },
  },
};
</script>

<style lang="scss">
.booking-error {
  position: fixed;
  bottom: 50px;
  z-index: 99999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  backface-visibility: hidden;
  background: rgba(0, 0, 0, 0.8);
  transition: opacity 350ms $easeOutMaterial;
  opacity: 0;
  pointer-events: none;
  &.visible {
    opacity: 1;
    pointer-events: initial;
  }
  &__error {
    background: $hdRed;
    width: 90%;
    padding: 50px 40px;
    position: relative;
    max-width: 500px;
    &__close {
      background: none;
      cursor: pointer;
      border: none;
      position: absolute;
      top: 10px;
      right: 10px;
      .material-icons {
        font-size: 24px;
        color: white;
      }
    }
    p {
      text-align: center;
      color: white;
      font-size: 16px;
      a {
        color: white;
        text-decoration: underline;
        @include on-hover {
          color: white;
        }
      }
    }
  }
}
</style>
