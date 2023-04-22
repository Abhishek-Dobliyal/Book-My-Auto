<template>
  <div class="container">
    <LocationMap
      :pickupLong="pickupLocation.coords.long"
      :pickupLat="pickupLocation.coords.lat"
      :dropLong="dropLocation.coords.long"
      :dropLat="dropLocation.coords.lat"
    ></LocationMap>
  </div>
</template>

<script setup>
import LocationMap from "@/components/LocationMap.vue";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const locations = store.getters.getUserLocation;
const pickupLocation = ref(locations.pickup);
const dropLocation = ref(locations.drop);
</script>
