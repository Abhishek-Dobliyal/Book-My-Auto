<template>
  <div class="container text-center mt-5 mx-auto">
    <div
      class="grid sm:grid-cols-2 sm:gap-x-28 gap-y-20 place-items-center place-content-center"
    >
      <Header
        mainHeading="Book With"
        headingText1="App"
        headingText2="Web"
        subHeading="No time to try out our app? Use the web version to book your Auto"
      ></Header>
      <Image name="bg-auto.png"></Image>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Image from "@/components/Image.vue";
</script>
