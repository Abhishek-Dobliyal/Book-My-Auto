<template>
  <div class="container flex flex-col justify-center items-center">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded sm:w-96 w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="username"
      :type="inputType"
      :placeholder="placeholder"
    />
    <div class="container ml-60 sm:ml-72">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: String,
  placeholder: String,
  inputType: {
    type: String,
    default: "text",
  },
});
</script>
