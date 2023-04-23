import { createStore } from "vuex";

export default createStore({
  state: {
    locations: {
      pickup: {
        text: "",
        coords: {},
      },
      drop: {
        text: "",
        coords: {},
      },
    },
    dummyStats: {
      "Trips Completed": "12,032,134",
      "Users Registered": "80,234",
      "Drivers Registered": "56,032",
    },
    geoapify: {
      key: "e249b38d65ee4291bdee74f98aed42af",
      reverseGeoCodeApi: "https://api.geoapify.com/v1/geocode/reverse?",
      geocodeApi:
        "https://api.geoapify.com/v1/geocode/search?format=json&country=india",
      routeApi: "https://api.geoapify.com/v1/routing?",
    },
  },
  getters: {
    getUserLocation(state) {
      return state.locations;
    },
    getDummyStats(state) {
      return state.dummyStats;
    },
    getGeoapifyData(state) {
      return state.geoapify;
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
