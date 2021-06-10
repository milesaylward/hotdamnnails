import { createStore } from 'vuex';
import parseData from './utils';
import {
  SET_SITE_DATA,
  SET_PAGE_LOADED,
  SET_WINDOW_SIZE,
} from './mutationTypes';

export default createStore({
  state: {
    siteDataLoaded: false,
    pageLoaded: false,
    viewWidth: 0,
    viewHeight: 0,
    app: {},
  },
  mutations: {
    [SET_SITE_DATA](state, { app }) {
      state.app = app;
      state.siteDataLoaded = true;
    },
    [SET_PAGE_LOADED](state, bool) {
      state.pageLoaded = bool;
    },
    [SET_WINDOW_SIZE](state, { dimensions }) {
      state.viewWidth = dimensions.width;
      if (!state.viewHeight || Math.abs(state.viewHeight - dimensions.height) > 200) {
        state.viewHeight = dimensions.height;
      }
    },
  },
  getters: {
    getContentByPath: (state) => (path) => {
      try {
        const pathArray = path.split('.');
        let obj = state.app;
        for (let i = 0; i < pathArray.length; i += 1) {
          obj = obj[pathArray[i]];
        }
        return obj;
      } catch (error) {
        return `string ${path} not found in state`;
      }
    },
    pageLoaded: (state) => state.siteDataLoaded && state.pageLoaded,
    isMobile: (state) => state.viewWidth < 600,
  },
  actions: {
    fetchSiteData({ commit }) {
      fetch('/.netlify/functions/get-copy').then((response) => response.json())
        .then((data) => {
          const parsedData = parseData(data);
          commit(SET_SITE_DATA, parsedData);
        });
    },
    setPageLoaded({ commit }, bool) { commit(SET_PAGE_LOADED, bool); },
  },
});
