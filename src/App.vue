<template>
  <main class="app" :class="{ mounted: pageLoaded }">
    <Navigation v-if="!underMaintenance" />
    <router-view v-if="siteDataLoaded && !underMaintenance" />
    <transition name="fade">
      <Loader v-if="!pageLoaded" />
      <Maintenance v-else-if="pageLoaded && underMaintenance" />
    </transition>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from '@/components/Navigation.vue';
import Loader from '@/components/Loader.vue';
import MediaListeners from '@/core/mediaListeners';
import Maintenance from '@/components/Maintenance.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Loader,
    Maintenance,
  },
  computed: {
    ...mapGetters(['pageLoaded', 'siteDataLoaded', 'isTouchDevice', 'getContentByPath']),
    underMaintenance() {
      return this.getContentByPath('base.site_under_maintenance');
    },
  },
  watch: {
    $route(val, prevVal) {
      if (val.name !== prevVal.name) {
        // this.setPageLoaded(false);
        window.scrollTo({
          top: 0,
        });
      }
    },
    siteDataLoaded() {
      if (this.underMaintenance) this.setPageLoaded(true);
    },
    isTouchDevice: {
      immediate: true,
      handler(val) {
        if (val) {
          document.body.classList.add('touch');
        }
      },
    },
  },
  created() {
    this.fetchSiteData();
    this.fetchAppointmentData();
    this.media = new MediaListeners(this.$store);
    this.media.init();
  },
  methods: {
    ...mapActions(['fetchSiteData', 'fetchAppointmentData']),
    ...mapActions(['setPageLoaded']),
  },
};
</script>

<style lang="scss">
@import './styles/_scaffold.scss';
.app {
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>
