import { createStore } from "vuex";

export default createStore({
  state: {
    locations: {
      pickup: "",
      drop: "",
    },
    dummyStats: {
      tripsCompletes: 12032134,
      usersRegistered: 80234,
      driversRegistered: 56032,
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
