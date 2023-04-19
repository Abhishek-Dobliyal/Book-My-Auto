<template>
  <div class="container mt-2">
    <div class="flex flex-col font-bold text-4xl space-y-2 my-7">
      <span>{{ mainHeading }} </span>
      <div class="container text-5xl space-x-3">
        <span class="line-through text-gray-500">{{ headingText1 }}</span>
        <span class="text-yellow-500">{{ headingText2 }}</span>
      </div>
    </div>
    <span class="font-semibold text-xl mx-2"> {{ subHeading }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  mainHeading: String,
  headingText1: String,
  headingText2: String,
  subHeading: String,
});
</script>

<style></style>
