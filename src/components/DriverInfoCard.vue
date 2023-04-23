<template>
  <div class="container mt-4">
    <div class="flex items-center h-full w-full justify-center">
      <div class="max-w-xs">
        <div class="bg-gray-200 shadow-xl rounded-lg py-3">
          <div class="photo-wrapper p-2">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              :src="profilePic"
              alt="John Doe"
            />
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
              {{ name }}
            </h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
              <span class="leading-2">{{ rideNumber }}</span>
            </div>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Ratings</td>
                  <td class="px-2 py-2">{{ ratings }}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                  <td class="px-2 py-2">+977 9955221114</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">
                    Trips Completed
                  </td>
                  <td class="px-2 py-2">{{ tripCompleted }}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-center my-3">
              <button
                class="text-md py-2 px-3 rounded-md shadow-lg bg-yellow-500 font-medium"
              >
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  ratings: Number,
  tripCompleted: Number,
  phone: String,
  rideNumber: String,
  profilePic: {
    type: String,
    default: "https://nammayatri.in/img/autoDriverWeb.png",
  },
});
</script>
<style scoped></style>
