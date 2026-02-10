<template>
  <div class="space-y-8">
    <div
      v-if="launches.length === 0 && !loading"
      class="text-center py-16 px-4"
    >
      <div class="max-w-md mx-auto">
        <Rocket class="w-20 h-20 mx-auto text-gray-300 mb-6" />
        <h3 class="text-xl font-semibold text-gray-900 mb-3">
          No launches found
        </h3>
        <p class="text-gray-500 mb-6">
          There are no launches to display at this time. Check back later for
          updates.
        </p>
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-sm text-blue-700">
            <strong>Tip:</strong> Rocket launch schedules are updated regularly.
            Refresh the page to see the latest information.
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="loading" class="flex justify-center py-16">
      <div class="text-center">
        <Spinner />
        <p class="mt-4 text-gray-500">Loading launch data...</p>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <LaunchCard
        v-for="launch in launches"
        :key="launch.id"
        :launch="launch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Launch } from "../types/launch";
import LaunchCard from "./LaunchCard.vue";
import Spinner from "./Spinner.vue";
import { Rocket } from "lucide-vue-next";

defineProps<{
  launches: Launch[];
  loading?: boolean;
}>();
</script>
