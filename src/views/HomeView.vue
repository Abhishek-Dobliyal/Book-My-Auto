<template>
  <div class="container text-center mt-5 mx-auto">
    <div
      class="grid sm:grid-cols-2 sm:gap-x-28 gap-y-20 place-items-center place-content-center"
    >
      <div class="container">
        <Header
          mainHeading="Book With"
          headingText1="App"
          headingText2="Web"
          subHeading="No time to try out our app? Use the web version to book your Auto"
        ></Header>
        <div class="container mt-7 space-y-3">
          <Input
            label="Pickup Location"
            placeholder="Enter Pickup Location"
            for="location-pickup"
          >
            <button
              class="mt-3 text-lg font-semibold hover:underline hover:decoration-yellow-500 hover:decoration-8"
              @click="getLocationFromCoords"
            >
              <i
                class="fa-solid fa-location-crosshairs hover:text-yellow-500"
              ></i>
            </button>
          </Input>
          <Input
            label="Drop Location"
            placeholder="Enter Drop Location"
            for="location-drop"
          ></Input>
        </div>
        <div
          class="container mt-4 animate__animated animate__fadeIn"
          v-if="isLocationError"
        >
          <span class="text-sm text-red-400 font-semibold">{{ errorMsg }}</span>
        </div>
        <Button
          content="Ride Now"
          btnStyle="text-lg font-semibold px-3 py-2 bg-yellow-500 rounded-md border-black mt-7  text-gray-800 w-32 shadow-md"
          iconStyle="fa-solid fa-spinner fa-spin"
          :showIcon="isFetching"
          :disabled="isFetching"
          @click="getCoordsFromLocation"
        ></Button>
      </div>
      <div class="grid grid-rows-1 gap-y-2.5">
        <MarqueeBanner></MarqueeBanner>
        <Image name="bg-auto.png"></Image>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Image from "@/components/Image.vue";
import Input from "@/components/Input.vue";
import Button from "@/components/Button.vue";
import MarqueeBanner from "@/components/MarqueeBanner.vue";
import axios from "axios";
import { useStore } from "vuex";
import { ref } from "vue";

const store = useStore();
const geoapify = store.getters.getGeoapifyData;
const userLocationData = store.getters.getUserLocation;

const isFetching = ref(false);
const isLocationError = ref(false);
const errorMsg = ref("");

const getLocationFromCoords = async () => {
  let url = new URL(geoapify.reverseGeoCodeApi);
  let pickupDetails = store.getters.getUserLocation.pickup;

  try {
    let coords = await getCoords();
    url.searchParams.append("lat", coords.latitude);
    url.searchParams.append("lon", coords.longitude);
    url.searchParams.append("apiKey", geoapify.key);

    pickupDetails.coords.long = coords.longitude;
    pickupDetails.coords.lat = coords.latitude;

    let resp = await axios.get(url.toString());
    let data = await resp.data;
    let locationJson = data.features[0].properties;
    let { road, city, country } = locationJson;
    store.getters.getUserLocation.pickup.text = `${road} ${city} ${country}`;
  } catch (err) {
    isLocationError.value = true;
    errorMsg.value = err;
    console.log(err);
  }
};

const getCoordsFromLocation = async () => {
  isFetching.value = true;
  const pickupLocationUrl = new URL(geoapify.geocodeApi);
  const dropLocationUrl = new URL(geoapify.geocodeApi);

  if (
    userLocationData.pickup.text.length === 0 ||
    userLocationData.drop.text.length === 0
  ) {
    isLocationError.value = true;
    isFetching.value = false;
    errorMsg.value = "Please fill in the required locations";
    setTimeout(() => {
      isLocationError.value = false;
      errorMsg.value = "";
    }, 2000);
    return;
  }

  pickupLocationUrl.searchParams.append("apiKey", geoapify.key);
  pickupLocationUrl.searchParams.append("text", userLocationData.pickup.text);
  dropLocationUrl.searchParams.append("apiKey", geoapify.key);
  dropLocationUrl.searchParams.append("text", userLocationData.drop.text);

  try {
    await setFetchedLocation(pickupLocationUrl, "pickup");
    await setFetchedLocation(dropLocationUrl, "drop");
    isFetching.value = false;
    console.log(store.getters.getUserLocation);
  } catch (err) {
    const errData = err.response.data;
    isLocationError.value = true;
    isFetching.value = false;
    errorMsg.value = "";
    console.log(err);
  }
};

const setFetchedLocation = async (url, type) => {
  const resp = await axios.get(url);
  const data = await resp.data;

  const predictedLocation = data.results.reduce((prev, curr) => {
    return prev.rank.confidence > curr.rank.confidence ? prev : curr;
  });

  userLocationData[type].text = `${
    predictedLocation.name ? predictedLocation.name : ""
  } ${predictedLocation.district ? predictedLocation.district : ""} ${
    predictedLocation.city ? predictedLocation.city : ""
  } ${predictedLocation.country ? predictedLocation.country : ""}`;

  userLocationData[type].coords.long = predictedLocation.lon;
  userLocationData[type].coords.lat = predictedLocation.lat;
};

const getCoords = () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};
</script>
