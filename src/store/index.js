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
    dummyDriverStats: {
      0: {
        name: "Rakesh Anna",
        phone: "+91 19827832813",
        rating: 4.5,
        tripsCompleted: 340,
        rideNumber: "KA XJASH123",
        ask: "300",
      },
      1: {
        name: "Rahul Shetty",
        phone: "+91 238181234212",
        rating: 4.8,
        tripsCompleted: 502,
        rideNumber: "KA XJ12SH67F",
        ask: "285",
      },
      2: {
        name: "Boyilla Srinivas",
        phone: "+91 23242634643",
        rating: 4.9,
        tripsCompleted: 424,
        rideNumber: "KA GHIEQ5623",
        ask: "250",
      },
      3: {
        name: "Vinay Kumar",
        phone: "+91 6267429443",
        rating: 4.7,
        tripsCompleted: 450,
        rideNumber: "KA KYU328HSAM",
        ask: "350",
      },
    },
    geoapify: {
      key: "YOUR-API",
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
    getDummyDriverStats(state) {
      return state.dummyDriverStats;
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
