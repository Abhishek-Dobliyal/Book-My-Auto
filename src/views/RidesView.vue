<template>
  <div class="container text-center mx-auto mt-10 sm:mt-5">
    <div class="container">
      <div
        class="container mt-4 animate__animated animate__fadeIn"
        v-if="hasError"
      >
        <Modal
          iconStyle="fa-solid fa-circle-exclamation text-yellow-500 fa-bounce"
          heading="Oops.. Something is not right!"
          :message="errorMsg"
          btnText="Got it"
        ></Modal>
      </div>
    </div>
    <div
      class="grid sm:grid-cols-2 sm:gap-x-28 gap-y-14 place-items-center place-content-center"
    >
      <div class="flex flex-col space-y-3 text-xl space-x-2 mx-2">
        <span
          ><span class="text-3xl font-semibold text-yellow-500">Ride </span>
          <span class="font-medium">From </span>
          <span class="italic font-semibold truncate">{{
            $store.getters.getUserLocation.pickup.text
          }}</span>
        </span>
        <span
          ><span class="text-3xl font-semibold text-yellow-500">To </span>
          <span class="italic font-semibold">{{
            $store.getters.getUserLocation.drop.text
          }}</span>
        </span>
        <span
          ><span class="font-medium">A distance of </span>
          <span class="text-3xl font-semibold text-yellow-500"
            >{{ distance }}
          </span>
          <span class="font-medium"> k.m to be travelled. </span>
        </span>
        <span
          ><span class="font-medium">Estimated </span>
          <span class="font-medium">fare </span>
          <span class="font-semibold text-3xl text-yellow-500"
            >₹ {{ fare }}</span
          ></span
        >
        <div class="flex px-2 rounded-lg py-3 mb-4">
          <button class="hover:text-yellow-500 font-semibold">
            <i class="fa-solid fa-arrow-left" @click="scrollLeft"></i>
          </button>
          <div
            class="flex overflow-x-scroll space-x-3 w-60 mx-auto mb-3 rounded-lg"
            ref="scrollContainer"
          >
            <div
              class="flex-shrink-0"
              v-for="stats in $store.getters.getDummyDriverStats"
              :key="stats"
            >
              <DriverInfoCard
                :name="stats.name"
                :phone="stats.phone"
                :rating="stats.rating"
                :tripsCompleted="stats.tripsCompleted"
                :rideNumber="stats.rideNumber"
                :ask="stats.ask"
              ></DriverInfoCard>
            </div>
          </div>
          <button class="hover:text-yellow-500 font-semibold">
            <i class="fa-solid fa-arrow-right" @click="scrollRight"></i>
          </button>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center mt-5 mb-3 mx-auto scroll-hidden relative z-0"
      >
        <LocationMap
          :pickupLong="pickupLocation.coords.long"
          :pickupLat="pickupLocation.coords.lat"
          :dropLong="dropLocation.coords.long"
          :dropLat="dropLocation.coords.lat"
        ></LocationMap>

        <Image name="bg-ride.png"></Image>
      </div>
    </div>
  </div>
</template>

<script setup>
import LocationMap from "@/components/LocationMap.vue";
import DriverInfoCard from "@/components/DriverInfoCard.vue";
import Modal from "@/components/Modal.vue";
import Image from "@/components/Image.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const locations = store.getters.getUserLocation;
const pickupLocation = ref(locations.pickup);
const dropLocation = ref(locations.drop);
const distance = ref();
const fare = ref();
const scrollContainer = ref();
const hasError = ref(false);
const errorMsg = ref("");

onMounted(async () => {
  const url = new URL(store.getters.getGeoapifyData.routeApi);
  url.searchParams.append(
    "waypoints",
    `${pickupLocation.value.coords.lat},${pickupLocation.value.coords.long}|${dropLocation.value.coords.lat},${dropLocation.value.coords.long}`
  );
  url.searchParams.append("mode", "drive");
  url.searchParams.append("apiKey", store.getters.getGeoapifyData.key);

  try {
    // const resp = await axios.get(url.toString());
    // const data = await resp.data;

    const driveInfo = data.features[0].properties;
    const distanceInKm = (driveInfo.distance / 1000).toFixed(2);
    distance.value = Number(distanceInKm).toLocaleString("en");
    const rideFare = (distanceInKm * 15).toFixed(2);
    fare.value = Number(rideFare).toLocaleString("en");
  } catch (err) {
    distance.value = "N/A";
    fare.value = "N/A";
    hasError.value = true;
    errorMsg.value = "Something went wrong fetching trip details";
    console.log(err);
  }
});

const scrollLeft = () => {
  sideScroll("left", 120, 255, 50);
};
const scrollRight = () => {
  sideScroll("right", 120, 255, 50);
};

const sideScroll = (direction, speed, distance, step) => {
  let scrollAmount = 0;
  let slideTimer = setInterval(() => {
    if (direction === "left") {
      scrollContainer.value.scrollLeft -= step;
    } else {
      scrollContainer.value.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};
</script>

<style scoped></style>
