<template>
  <div class="container my-auto">
    <button :class="btnStyle">
      {{ !showIcon ? content : "" }} <i :class="iconStyle" v-if="showIcon"></i>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  content: String,
  iconStyle: String,
  showIcon: Boolean,
  btnStyle: String,
});
</script>
