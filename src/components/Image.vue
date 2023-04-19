<template>
  <div class="container">
    <img :src="require(`@/assets/${name}`)" class="h-auto max-w-sm" alt="" />
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});
</script>

<style></style>
