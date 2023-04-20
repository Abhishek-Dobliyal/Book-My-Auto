import { createStore } from "vuex";

export default createStore({
  state: {
    locations: {
      pickup: "",
      drop: "",
    },
  },
  getters: {
    getUserLocation(state) {
      return state.locations;
    },
  },
  mutations: {
    setUserLocation(state, payload) {
      state.locations = payload;
    },
  },
  actions: {},
  modules: {},
});
