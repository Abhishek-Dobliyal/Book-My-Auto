import { createStore } from "vuex";

export default createStore({
  state: {
    locations: {
      pickup: "",
      drop: "",
    },
    dummyStats: {
      "Trips Completed": "12,032,134",
      "Users Registered": "80,234",
      "Drivers Registered": "56,032",
    },
  },
  getters: {
    getUserLocation(state) {
      return state.locations;
    },

    getDummyStats(state) {
      return state.dummyStats;
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
