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
        <div class="container mt-7 space-y-4 relative">
          <Input label="Pickup Location" placeholder="Enter Pickup Location">
            <button
              class="mt-3 text-sm font-semibold hover:underline hover:decoration-yellow-500 hover:decoration-8"
              @click="getLocation"
            >
              Locate Me
            </button>
          </Input>
          <Input
            label="Drop Location"
            placeholder="Enter Drop Location"
          ></Input>
        </div>
      </div>
      <Image name="bg-auto.png"></Image>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Image from "@/components/Image.vue";
import Input from "@/components/Input.vue";
import axios from "axios";
import { useStore } from "vuex";

const store = useStore();
const apiKey = "e249b38d65ee4291bdee74f98aed42af";

const getLocation = async () => {
  let url = new URL("https://api.geoapify.com/v1/geocode/reverse?");

  try {
    let coords = await getCoords();
    url.searchParams.append("lat", coords.latitude);
    url.searchParams.append("lon", coords.longitude);
    url.searchParams.append("apiKey", apiKey);

    let resp = await axios.get(url.toString());
    let data = await resp.data;
    let locationJson = data.features[0].properties;
    let { road, district, country } = locationJson;
    console.log(road, district, country);
  } catch (err) {
    console.log(err);
  }
};

const getCoords = async () => {
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
