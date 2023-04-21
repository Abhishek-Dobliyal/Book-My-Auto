<template>
  <div class="container flex flex-col justify-center items-center">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      {{ label }}
    </label>
    <input
      class="shadow appearance-none border rounded sm:w-96 w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :type="inputType"
      :placeholder="placeholder"
      v-model="inputData"
      @input="storeInput"
    />
    <div class="container ml-72 sm:ml-80">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useStore } from "vuex";

const inputData = ref("");
const store = useStore();

const props = defineProps({
  label: String,
  placeholder: String,
  inputType: {
    type: String,
    default: "text",
  },
  for: String,
});

// set the input value to the desired store state property
const storeInput = computed(() => {
  let [property, option] = props.for.split("-");

  if (property === "location") {
    store.getters.getUserLocation[option].text = inputData.value;
  }
});

// watchEffect to update the input incase of value change in any of the store state property by some other component
watchEffect(() => {
  let [property, option] = props.for.split("-");
  if (property === "location") {
    inputData.value = store.getters.getUserLocation[option].text;
  }
});
</script>
