<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
      <!-- Rocket Filter -->
      <div class="space-y-2">
        <label for="rocket-filter" class="text-sm font-semibold text-gray-700 block ml-1">
          Rocket
        </label>
        <div class="relative">
          <select
            id="rocket-filter"
            v-model="selectedRocket"
            @change="emitFilters"
            class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none transition-all hover:bg-white"
          >
            <option :value="null">All Rockets</option>
            <option v-for="rocket in rockets" :key="rocket.id" :value="rocket.id">
              {{ rocket.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Agency Filter -->
      <div class="space-y-2">
        <label for="agency-filter" class="text-sm font-semibold text-gray-700 block ml-1">
          Agency
        </label>
        <div class="relative">
          <select
            id="agency-filter"
            v-model="selectedAgency"
            @change="emitFilters"
            class="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none transition-all hover:bg-white"
          >
            <option :value="null">All Agencies</option>
            <option v-for="agency in agencies" :key="agency.id" :value="agency.id">
              {{ agency.name }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Reset Button -->
      <div class="flex items-center">
        <button
          @click="resetFilters"
          class="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center px-2 py-1"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Rocket } from '../types/rocket';
import type { Agency } from '../types/agency';

const props = defineProps<{
  rockets: Rocket[];
  agencies: Agency[];
}>();

const emit = defineEmits<{
  (e: 'filter', filters: { rocketId: number | null; agencyId: number | null }): void;
}>();

const selectedRocket = ref<number | null>(null);
const selectedAgency = ref<number | null>(null);

const emitFilters = () => {
  emit('filter', {
    rocketId: selectedRocket.value,
    agencyId: selectedAgency.value,
  });
};

const resetFilters = () => {
  selectedRocket.value = null;
  selectedAgency.value = null;
  emitFilters();
};
</script>
