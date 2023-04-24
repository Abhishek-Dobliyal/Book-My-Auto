<template>
  <div class="container w-96 h-72 mx-10 rounded-md shadow-md" ref="myMap"></div>
</template>

<script setup>
import L from "leaflet";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const myMap = ref();
const locations = store.getters.getUserLocation;
const pickupLocation = locations.pickup;
const dropLocation = locations.drop;

onMounted(() => {
  const initialState = {
    lng: pickupLocation.coords.long,
    lat: pickupLocation.coords.lat,
    zoom: 5,
  };
  const map = L.map(myMap.value).setView(
    [initialState.lat, initialState.lng],
    initialState.zoom
  );

  // Choose URL link base on device display
  const isRetina = L.Browser.retina;
  const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${store.getters.getGeoapifyData.key}`;
  const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${store.getters.getGeoapifyData.key}`;

  // Markers
  const pickupMarkerIconOpts = {
    iconUrl: require("../assets/marker.png"),
    iconSize: [25, 25],
  };
  const dropMarkerIconOpts = {
    iconUrl: require("../assets/destination.png"),
    iconSize: [25, 25],
  };
  const driverMarkerIconOpts = {
    iconUrl: require("../assets/rickshaw.png"),
    iconSize: [25, 25],
  };

  const pickupMarkerIcon = new L.icon(pickupMarkerIconOpts);
  const dropMarkerIcon = new L.icon(dropMarkerIconOpts);
  const driverMarkerIcon = new L.icon(driverMarkerIconOpts);
  const pickupMarker = new L.Marker(
    [pickupLocation.coords.lat, pickupLocation.coords.long],
    {
      icon: pickupMarkerIcon,
    }
  );
  const dropMarker = new L.Marker(
    [dropLocation.coords.lat, dropLocation.coords.long],
    {
      icon: dropMarkerIcon,
    }
  );

  const driverLocations = generateRandomDriverLocation(
    pickupLocation.coords,
    4
  );
  let markers = [pickupMarker, dropMarker];
  for (const coords of driverLocations) {
    console.log(coords.newLatitude, coords.newLongitude);
    let driverMarker = new L.Marker([coords.newLatitude, coords.newLongitude], {
      icon: driverMarkerIcon,
    });
    markers.push(driverMarker);
    driverMarker.addTo(map);
  }
  // Display marker as per distance
  const group = new L.featureGroup(markers);
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

const generateLocation = (latitude, longitude, max, min = 0) => {
  const EARTH_RADIUS = 6371;
  const DEGREE = ((EARTH_RADIUS * 2 * Math.PI) / 360) * 1000;

  const maxKm = max * 1000;
  const minKm = min * 1000;
  const r = (maxKm - minKm + 1) * Math.random() ** 0.5 + minKm;

  const theta = Math.random() * 2 * Math.PI;

  const dy = r * Math.sin(theta);
  const dx = r * Math.cos(theta);

  let newLatitude = latitude + dy / DEGREE;
  let newLongitude =
    longitude + dx / (DEGREE * Math.cos((Math.PI / 180) * latitude));

  return {
    newLatitude,
    newLongitude,
  };
};

const generateRandomDriverLocation = (pickupCoords, numDrivers = 2) => {
  let res = [];
  for (let i = 0; i < numDrivers; i++) {
    const maxDistanceFromSource = Math.random().toFixed(2);
    res.push(
      generateLocation(
        pickupCoords.lat,
        pickupCoords.long,
        Number(maxDistanceFromSource)
      )
    );
  }

  return res;
};
</script>

<style scoped></style>
