<template>
  <div class="container w-full h-56 rounded-md shadow-md" ref="myMap"></div>
</template>

<script setup>
import L from "leaflet";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  pickupLong: Number,
  pickupLat: Number,
  dropLong: Number,
  dropLat: Number,
});
const store = useStore();
const myMap = ref();

onMounted(() => {
  const initialState = {
    lng: props.pickupLong,
    lat: props.pickupLat,
    zoom: 5,
  };

  const map = L.map(myMap.value).setView(
    [initialState.lat, initialState.lng],
    initialState.zoom
  );

  const isRetina = L.Browser.retina;
  const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${store.getters.getGeoapifyData.key}`;
  const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${store.getters.getGeoapifyData.key}`;

  const pickupMarkerIconOpts = {
    iconUrl: require("../assets/marker.png"),
    iconSize: [25, 25],
  };
  const dropMarkerIconOpts = {
    iconUrl: require("../assets/destination.png"),
    iconSize: [35, 35],
  };
  const pickupMarkerIcon = L.icon(pickupMarkerIconOpts);
  const dropMarkerIcon = L.icon(dropMarkerIconOpts);
  const pickupMarker = new L.Marker([props.pickupLat, props.pickupLong], {
    icon: pickupMarkerIcon,
  });
  const dropMarker = new L.Marker([props.dropLat, props.dropLong], {
    icon: dropMarkerIcon,
  });
  // Display marker as per distance
  const group = new L.featureGroup([pickupMarker, dropMarker]);
  map.fitBounds(group.getBounds());

  pickupMarker.bindPopup("You are here").openPopup();
  dropMarker.bindPopup("Drop here").openPopup();
  pickupMarker.addTo(map);
  dropMarker.addTo(map);

  L.tileLayer(isRetina ? retinaUrl : baseUrl, {
    apiKey: store.getters.getGeoapifyData.key,
    maxZoom: 30,
    id: "osm-carto",
  }).addTo(map);
});
</script>

<style scoped></style>
