import { createStore } from 'vuex';
import parseData from './utils';
import {
  SET_SITE_DATA,
  SET_PAGE_LOADED,
} from './mutationTypes';

export default createStore({
  state: {
    siteDataLoaded: false,
    pageLoaded: false,
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
