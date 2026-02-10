<template>
  <div
    class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
  >
    <div class="text-sm text-gray-700">
      Showing
      <span class="font-medium text-gray-900">{{ startItem }}</span>
      to
      <span class="font-medium text-gray-900">{{ endItem }}</span>
      of
      <span class="font-medium text-gray-900">{{ totalItems }}</span>
      results
    </div>

    <div class="flex items-center space-x-1">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Previous page"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        @click="typeof page === 'number' ? goToPage(page) : null"
        :class="[
          'px-3 py-2 rounded-md text-sm font-medium transition-colors',
          page === currentPage
            ? 'bg-blue-600 text-white shadow-sm'
            : page === '...'
            ? 'cursor-default border-0 bg-transparent text-gray-500'
            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        ]"
        :disabled="page === '...'"
      >
        {{ page }}
      </button>

      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="p-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Next page"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
}>();

const emit = defineEmits<{
  "page-change": [page: number];
}>();

const itemsPerPage = computed(() => props.itemsPerPage || 10);

const startItem = computed(() => {
  return props.totalItems === 0
    ? 0
    : (props.currentPage - 1) * itemsPerPage.value + 1;
});

const endItem = computed(() => {
  const end = props.currentPage * itemsPerPage.value;
  return end > props.totalItems ? props.totalItems : end;
});

const visiblePages = computed(() => {
  const delta = 2;
  const range: number[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined;

  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === 1 ||
      i === props.totalPages ||
      (i >= props.currentPage - delta && i <= props.currentPage + delta)
    ) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
});

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return;
  }
  emit("page-change", page);
};
</script>
