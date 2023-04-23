<template>
  <div
    class="relative z-40"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    v-if="isShown"
  >
    <div class="fixed inset-0 bg-gray-500 bg-opacity-80"></div>

    <div class="fixed inset-0 z-40 overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg z-40"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <i :class="iconStyle"></i>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {{ heading }}
                </h3>
                <div class="mt-2">
                  <span class="text-sm text-gray-500">
                    {{ message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-400 sm:ml-3 sm:w-auto"
              @click="isShown = !isShown"
            >
              {{ btnText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isShown = ref(true);

const props = defineProps({
  heading: String,
  message: String,
  iconStyle: String,
  btnText: String,
});
</script>
