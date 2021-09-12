<template>
  <main class="app" :class="{ mounted: pageLoaded }">
    <Navigation />
    <router-view v-if="siteDataLoaded" />
    <transition name="fade">
      <Loader v-if="!pageLoaded" />
    </transition>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from '@/components/Navigation.vue';
import Loader from '@/components/Loader.vue';
import MediaListeners from '@/core/mediaListeners';

export default {
  name: 'App',
  components: {
    Navigation,
    Loader,
  },
  computed: {
    ...mapGetters(['pageLoaded', 'siteDataLoaded', 'isTouchDevice']),
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
}
</style>
