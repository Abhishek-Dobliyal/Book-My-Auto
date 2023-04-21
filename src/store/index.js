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
      geocodeApi: "https://api.geoapify.com/v1/geocode/search?format=json&country=india",
      routeApi:
        "https://api.geoapify.com/v1/routing?waypoints=50.67902320667227,4.569876996843732|50.66170571489684,4.578667041603012&mode=drive&apiKey=d548c5ed24604be6a9dd0d989631f783",
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
