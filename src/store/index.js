import { createStore } from 'vuex';
import UAParser from 'ua-parser-js';
// import { TEST_BOOKING } from '@/core/constants';
import parseData from './utils';
import * as types from './mutationTypes';

const parser = new UAParser();

export default createStore({
  state: {
    pageLoaded: false,
    viewWidth: window.innerWidth,
    viewHeight: window.innerHeight,
    availableDates: null,
    adminLoggedIn: false || process.env.NODE_ENV === 'development',
    adminError: false,
    datesLoading: false,
    bookingLoading: false,
    bookingSuccess: null,
    bookingError: false,
    policyAccepted: false || process.env.NODE_ENV === 'development',
    noDates: false,
    bookingErrorBlocked: false,
    bookingErrorCopy: '',
    app: {},
    modalOpen: false,
    modalType: null,
    selectedDesign: null,
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
    [types.SET_NO_DATES](state, bool) {
      state.noDates = bool;
    },
    [types.RESET_BOOKING](state) {
      state.bookingSuccess = null;
    },
    [types.SET_POLICY_ACCEPTED](state, bool) {
      state.policyAccepted = bool;
    },
    [types.SET_MODAL_OPEN](state, modalType) {
      state.modalOpen = true;
      state.modalType = modalType;
    },
    [types.SET_MODAL_CLOSED](state) {
      state.modalOpen = false;
      setTimeout(() => { state.modalType = null; }, 650);
    },
    [types.SET_SELECTED_DESIGN](state, type) {
      state.selectedDesign = type;
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
    siteDataLoaded: (state) => Object.keys(state.app).length && state.appointmentData,
    pageLoaded: (state, getters) => getters.siteDataLoaded && state.pageLoaded,
    isMobile: (state) => state.viewWidth < 600,
    isLarge: (state) => state.viewWidth > 1024,
    isIOS: () => parser.getOS().name === 'iOS',
    isAdmin: (state) => state.adminLoggedIn,
    isTouchDevice: () => {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return true;
      }
      return false;
    },
    getItemHtml: () => (item) => {
      const replaceString = (string, link) => string.replace(/{{(.+?)}}/, (match, inner) => `<a href="${link}" target="_blank">${inner}</a>`);
      let html = item.value;
      item.links.forEach((link) => { html = replaceString(html, link); });
      return html;
    },
  },
  actions: {
    clearAvailableDates({ commit }) {
      commit(types.CLEAR_AVAILABLE_DATES);
    },
    clearBookingError({ commit }) {
      commit(types.CLEAR_BOOKING_ERROR);
    },
    openModal({ commit }, type) {
      commit(types.SET_MODAL_OPEN, type);
    },
    closeModal({ commit }) {
      commit(types.SET_MODAL_CLOSED);
    },
    setSelectedDesign({ commit }, type) {
      commit(types.SET_SELECTED_DESIGN, type);
    },
    resetBooking({ commit }) {
      commit(types.CLEAR_AVAILABLE_DATES);
      commit(types.CLEAR_BOOKING_ERROR);
      commit(types.SET_POLICY_ACCEPTED, false);
      commit(types.RESET_BOOKING);
    },
    setPolicyAccepted({ commit }, bool) {
      commit(types.SET_POLICY_ACCEPTED, bool);
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
      commit(types.SET_NO_DATES, false);
      fetch('./.netlify/functions/get-availability', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then((res) => res.json())
        .then((response) => {
          if (response.length) {
            commit(types.SET_AVAILABLE_DATES, response);
          } else {
            commit(types.SET_NO_DATES, true);
          }
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
    async verifyClientKey(context, data) {
      const key = await fetch('./.netlify/functions/verify_client_key', { method: 'POST', body: JSON.stringify(data) });
      const response = await key.json();
      return { message: response.message, status: key.status };
    },
    setPageLoaded({ commit }, bool) { commit(types.SET_PAGE_LOADED, bool); },
  },
});
