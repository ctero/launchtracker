<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="relative">
      <img
        v-if="launch.image"
        :src="launch.image.image_url"
        :alt="launch.name"
        class="w-full h-48 object-cover"
      />
      <div
        v-else
        class="w-full h-48 bg-gray-200 flex items-center justify-center"
      >
        <Rocket class="w-12 h-12 text-gray-400" />
      </div>
      <div
        class="absolute top-3 right-3 px-2 py-1 text-xs font-semibold rounded-full backdrop-blur-sm"
        :class="statusClass"
      >
        {{ launch.status.abbrev }}
      </div>
    </div>

    <div class="p-5">
      <h3 class="text-lg font-semibold text-gray-900 mb-2 leading-tight">
        {{ launch.name }}
      </h3>

      <div v-if="launch.mission" class="mb-4">
        <p class="text-sm text-gray-700 font-medium">
          {{ launch.mission.name }}
        </p>
        <p
          v-if="launch.mission.description"
          class="text-xs text-gray-500 mt-1 line-clamp-2"
        >
          {{ launch.mission.description }}
        </p>
      </div>

      <div class="space-y-3 text-sm">
        <div class="flex items-center text-gray-600">
          <Calendar class="w-4 h-4 mr-3 text-blue-500" />
          <span>{{ formattedDate }}</span>
        </div>

        <div class="flex items-center text-gray-600">
          <MapPin class="w-4 h-4 mr-3 text-red-500" />
          <span>{{ launch.pad.location.name }}</span>
        </div>

        <div class="flex items-center text-gray-600">
          <Zap class="w-4 h-4 mr-3 text-purple-500" />
          <span>{{ launch.rocket.configuration.full_name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Launch } from "../types/launch";
import { Rocket, Calendar, MapPin, Zap } from "lucide-vue-next";

const props = defineProps<{
  launch: Launch;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.launch.window_start);
  return date.toLocaleString();
});

const statusClass = computed(() => {
  switch (props.launch.status.abbrev) {
    case "Success":
      return "bg-green-100 text-green-800 bg-opacity-90";
    case "Failure":
      return "bg-red-100 text-red-800 bg-opacity-90";
    case "Go":
      return "bg-blue-100 text-blue-800 bg-opacity-90";
    case "TBD":
    case "TBC":
      return "bg-yellow-100 text-yellow-800 bg-opacity-90";
    default:
      return "bg-gray-100 text-gray-800 bg-opacity-90";
  }
});
</script>
