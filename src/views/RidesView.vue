<template>
  <div class="container text-center mt-4 mx-auto">
    <div
      class="grid sm:grid-cols-2 sm:gap-x-28 gap-y-14 place-items-center place-content-center"
    >
      <div class="flex flex-col space-y-3 text-xl space-x-2 mx-2">
        <span
          ><span class="text-3xl font-semibold text-yellow-500">Ride </span>
          <span class="font-medium">From </span>
          <span class="italic font-semibold">{{
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
        <div class="container">
          <div
            class="flex overflow-x-auto space-x-3 w-60 mx-auto snap-x snap-mandatory"
          >
            <div class="flex-shrink-0 snap-center">
              <DriverInfoCard></DriverInfoCard>
            </div>
            <div class="flex-shrink-0 snap-center">
              <DriverInfoCard></DriverInfoCard>
            </div>
            <div class="flex-shrink-0 snap-center">
              <DriverInfoCard></DriverInfoCard>
            </div>
            <div class="flex-shrink-0 snap-center">
              <DriverInfoCard></DriverInfoCard>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col justify-center items-center mt-5 mb-3 mx-auto scroll-hidden"
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

onMounted(async () => {
  const url = new URL(store.getters.getGeoapifyData.routeApi);
  url.searchParams.append(
    "waypoints",
    `${pickupLocation.value.coords.lat},${pickupLocation.value.coords.long}|${dropLocation.value.coords.lat},${dropLocation.value.coords.long}`
  );
  url.searchParams.append("mode", "drive");
  url.searchParams.append("apiKey", store.getters.getGeoapifyData.key);

  // const resp = await axios.get(url.toString());
  const data = await resp.data;

  const driveInfo = data.features[0].properties;
  const distanceInKm = (driveInfo.distance / 1000).toFixed(2);
  distance.value = Number(distanceInKm).toLocaleString("en");
  const rideFare = (distanceInKm * 15).toFixed(2);
  fare.value = Number(rideFare).toLocaleString("en");
});
</script>

<style scoped></style>
