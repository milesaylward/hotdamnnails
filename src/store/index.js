import { createStore } from 'vuex';
import UAParser from 'ua-parser-js';
// import { TEST_BOOKING } from '@/core/constants';
import parseData from './utils';
import * as types from './mutationTypes';

const parser = new UAParser();

export default createStore({
  state: {
    pageLoaded: false,
    viewWidth: 0,
    viewHeight: 0,
    availableDates: null,
    adminLoggedIn: false || process.env.NODE_ENV === 'development',
    adminError: false,
    datesLoading: false,
    bookingLoading: false,
    bookingSuccess: null,
    bookingError: false,
    bookingErrorBlocked: false,
    bookingErrorCopy: '',
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
    [types.SET_DATES_LOADING](state, bool) {
      state.datesLoading = bool;
    },
    [types.CLEAR_AVAILABLE_DATES](state) {
      state.availableDates = null;
    },
    [types.SET_BOOKING_LOADING](state, bool) {
      state.bookingLoading = bool;
    },
    [types.SET_BOOKING_SUCCESS](state, booking) {
      state.bookingLoading = false;
      state.bookingSuccess = booking;
    },
    [types.SET_BOOKING_ERROR](state, { copy, isBlocked }) {
      state.bookingLoading = false;
      state.bookingError = true;
      state.bookingErrorCopy = copy;
      state.bookingErrorBlocked = isBlocked;
    },
    [types.SET_ADMIN_AUTH](state, bool) {
      state.adminError = false;
      state.adminLoggedIn = bool;
    },
    [types.SET_ADMIN_ERROR](state) {
      state.adminLoggedIn = false;
      state.adminError = true;
    },
    [types.CLEAR_BOOKING_ERROR](state) {
      state.bookingError = false;
      state.bookingErrorBlocked = false;
      state.bookingErrorCopy = '';
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
    isMobile: (state) => state.viewWidth < 600 || window.innerWidth < 600,
    isLarge: (state) => state.viewWidth > 1024,
    isIOS: () => parser.getOS().name === 'iOS',
    isAdmin: (state) => state.adminLoggedIn,
    isTouchDevice: () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return true;
      }
      return false;
    },
  },
  actions: {
    clearAvailableDates({ commit }) {
      commit(types.CLEAR_AVAILABLE_DATES);
    },
    clearBookingError({ commit }) {
      commit(types.CLEAR_BOOKING_ERROR);
    },
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
      commit(types.SET_DATES_LOADING, true);
      fetch('./.netlify/functions/get-availability', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json())
        .then((response) => {
          commit(types.SET_AVAILABLE_DATES, response);
          commit(types.SET_DATES_LOADING, false);
        });
    },
    bookAppointment({ commit }, data) {
      commit(types.SET_BOOKING_LOADING, true);
      fetch('./.netlify/functions/book', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json())
        .then((response) => {
          if (response.status_code && response.status_code !== 200) {
            const isBlocked = response.error === 'scheduling_forbidden';
            const errorCopy = isBlocked
              ? response.data.client_message
              : 'Something went wrong please try again';
            commit(types.SET_BOOKING_ERROR, { copy: errorCopy, isBlocked });
            return;
          }
          commit(types.SET_BOOKING_LOADING, false);
          commit(types.SET_BOOKING_SUCCESS, response);
        }).catch(() => {
        });
    },
    authAdmin({ commit }, data) {
      fetch('./.netlify/functions/auth', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error(res);
      }).then((response) => {
        commit(types.SET_ADMIN_AUTH, response.authenticated);
      }).catch(() => {
        console.log('caught error');
        commit(types.SET_ADMIN_ERROR);
      });
    },
    setPageLoaded({ commit }, bool) { commit(types.SET_PAGE_LOADED, bool); },
  },
});
