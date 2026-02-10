<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Upcoming Launches</h1>
      <p class="text-gray-600">
        Discover the latest scheduled rocket launches from around the world
      </p>
    </div>

    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start"
    >
      <svg
        class="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        />
      </svg>
      <div><strong class="font-medium">Error:</strong> {{ error }}</div>
    </div>

    <LaunchList :launches="launches" :loading="loading" />

    <div v-if="!loading && !error && totalPages > 1" class="mt-8">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="totalItems"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getUpcomingLaunches } from "../services/launchApi";
import type { Launch, PaginatedLaunchResponse } from "../types/launch";
import LaunchList from "../components/LaunchList.vue";
import Pagination from "../components/Pagination.vue";

const launches = ref<Launch[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const totalItems = ref(0);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const fetchLaunches = async (page: number) => {
  try {
    loading.value = true;
    error.value = null;

    const response: PaginatedLaunchResponse = await getUpcomingLaunches(
      page,
      itemsPerPage
    );

    launches.value = response.results;
    totalItems.value = response.count;
    currentPage.value = page;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to fetch upcoming launches";
    launches.value = [];
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  fetchLaunches(page);
};

onMounted(() => {
  fetchLaunches(1);
});
</script>
