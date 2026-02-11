<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Recent Launches</h1>
      <p class="text-gray-600">
        Explore the history of recent rocket launches from around the world
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

    <LaunchList :launches="paginatedLaunches" :loading="loading" />

    <div v-if="!loading && !error && totalPages > 1" class="mt-8">
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="allLaunches.length"
        :items-per-page="itemsPerPage"
        @page-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getPreviousLaunches } from "../services/launchApi";
import type { Launch } from "../types/launch";
import LaunchList from "../components/LaunchList.vue";
import Pagination from "../components/Pagination.vue";

/** Full set of launches fetched once from the API. */
const allLaunches = ref<Launch[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const itemsPerPage = 15;

const totalPages = computed(() =>
  Math.ceil(allLaunches.value.length / itemsPerPage)
);

/** The slice of allLaunches for the current page. */
const paginatedLaunches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allLaunches.value.slice(start, start + itemsPerPage);
});

const fetchLaunches = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await getPreviousLaunches();

    allLaunches.value = response.results;
    currentPage.value = 1;
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "Failed to fetch recent launches";
    allLaunches.value = [];
  } finally {
    loading.value = false;
  }
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  fetchLaunches();
});
</script>
