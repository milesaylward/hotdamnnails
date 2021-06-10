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
import { mapActions, mapGetters, mapState } from 'vuex';
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
    ...mapGetters(['pageLoaded']),
    ...mapState(['siteDataLoaded']),
  },
  watch: {
    $route: {
      deep: true,
      handler(val, prevVal) {
        if (val.name !== prevVal.name) {
          this.setPageLoaded(false);
          window.scrollTo({
            top: 0,
          });
        }
      },
    },
  },
  created() {
    this.fetchSiteData();
    this.media = new MediaListeners(this.$store);
    this.media.init();
  },
  methods: {
    ...mapActions(['fetchSiteData']),
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
