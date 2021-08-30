<template>
  <div class="page maintenance">
    <h1>Booking Currently Under Construction<br>Please Check back Later</h1>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Booking',
  mounted() {
    this.setPageLoaded(true);
  },
  methods: {
    ...mapActions(['setPageLoaded']),
  },
};
</script>

<style lang="scss">
.maintenance {
  height: 100vh;
  width: 100%;
  padding: $headerHeightMobile 9px 0;
  position: relative;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 90%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
}
</style>
