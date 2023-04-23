<template>
  <div class="container w-80 mx-auto sm:w-96 relative -z-10">
    <div
      class="relative flex overflow-x-hidden justify-center items-center z-10"
    >
      <div class="animate-marquee whitespace-nowrap">
        <span
          class="text-lg mx-2 font-bold"
          v-for="(stats, key) in $store.getters.getDummyStats"
          :key="stats"
        >
          <span class="mx-2">•</span>
          <span class="mx-2">{{ key }}:</span>
          <span>{{ stats }}</span>
        </span>
      </div>

      <div class="absolute top-0 animate-marquee2 whitespace-nowrap">
        <span
          class="text-lg mx-4 font-bold"
          v-for="(stats, key) in $store.getters.getDummyStats"
          :key="stats"
        >
          <span class="mx-1">•</span>
          <span class="mx-2">{{ key }}:</span>
          <span>{{ stats }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
