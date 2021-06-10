<template>
  <div class="page booking">
    <iframe
      src="https://app.acuityscheduling.com/schedule.php?owner=21110176"
      title="Schedule Appointment"
      width="100%"
      height="100%"
      frameBorder="0"
      ref="iframe"
      @load="handleBookingLoaded"
    ></iframe>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Booking',
  methods: {
    ...mapActions(['setPageLoaded']),
    handleBookingLoaded() {
      this.setPageLoaded(true);
    },
  },
};
</script>

<style lang="scss">
.booking {
  height: 100vh;
  width: 100%;
  padding: $headerHeightMobile 9px 0;
  @include bpMedium {
    padding: $headerHeight 9px 0;
  }
  iframe {
    height: 100vh;
    border: none;
  }
}
</style>
