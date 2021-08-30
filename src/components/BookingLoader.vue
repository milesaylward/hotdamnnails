<template>
  <div class="booking-loader">
    <loader />
    <h3>Booking Your Appointment</h3>
  </div>
</template>

<script>
import Loader from './Loader.vue';

export default {
  name: 'BookingLoader',
  components: {
    Loader,
  },
};
</script>

<style lang="scss">
.booking-loader {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(black, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  left: 0;
  z-index: 1000;
  h3 {
    color: white;
  }
  .loader {
    background: none;
    width: 100px;
    height: 100px;
    position: static;
    &__loader {
      width: 100px;
      height: 100px;
      margin: -50px 0 0 -50px;
    }
  }
}
</style>
