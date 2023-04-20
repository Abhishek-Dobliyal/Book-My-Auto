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
              @click="getCoords"
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

const getCoords = () => {
  console.log("Hello");
};
</script>
