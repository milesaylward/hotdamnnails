import { createStore } from 'vuex';
import parseData from './utils';
import * as types from './mutationTypes';

export default createStore({
  state: {
    pageLoaded: false,
    viewWidth: 0,
    viewHeight: 0,
    availableDates: null,
    app: {},
  },
  mutations: {
    [types.SET_SITE_DATA](state, { app }) {
      state.app = app;
      state.siteDataLoaded = true;
    },
    [types.SET_PAGE_LOADED](state, bool) {
      state.pageLoaded = bool;
    },
    [types.SET_WINDOW_SIZE](state, { dimensions }) {
      state.viewWidth = dimensions.width;
      if (!state.viewHeight || Math.abs(state.viewHeight - dimensions.height) > 200) {
        state.viewHeight = dimensions.height;
      }
    },
    [types.SET_APPOINTMENT_DATA](state, data) {
      state.appointmentData = data;
    },
    [types.SET_AVAILABLE_DATES](state, data) {
      state.availableDates = data;
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
    siteDataLoaded: (state) => state.app && state.appointmentData,
    pageLoaded: (state, getters) => getters.siteDataLoaded && state.pageLoaded,
    isMobile: (state) => state.viewWidth < 600,
    isTouchDevice: () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return true;
      }
      return false;
    },
  },
  actions: {
    fetchSiteData({ commit }) {
      fetch('/.netlify/functions/get-copy').then((response) => response.json())
        .then((data) => {
          const parsedData = parseData(data);
          commit(types.SET_SITE_DATA, parsedData);
        });
    },
    fetchAppointmentData({ commit }) {
      fetch('./.netlify/functions/get-appointments').then((res) => res.json())
        .then((data) => {
          commit(types.SET_APPOINTMENT_DATA, data);
        });
    },
    getAvailableDates({ commit }, data) {
      fetch('./.netlify/functions/get-availability', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json())
        .then((response) => {
          commit(types.SET_AVAILABLE_DATES, response);
        });
    },
    setPageLoaded({ commit }, bool) { commit(types.SET_PAGE_LOADED, bool); },
  },
});
