<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <Rocket class="w-8 h-8 text-blue-600 mr-3" />
          <h1 class="text-xl font-bold text-gray-900">Rocket Launch Tracker</h1>
        </div>

        <nav class="hidden md:flex space-x-8">
          <router-link
            to="/"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            Upcoming Launches
          </router-link>

          <router-link
            to="/recent"
            class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-blue-600 bg-blue-50"
          >
            Recent Launches
          </router-link>
        </nav>

        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-blue-600 p-2 rounded-md"
          >
            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <div
        v-if="mobileMenuOpen"
        class="md:hidden border-t border-gray-200 py-2"
      >
        <router-link
          to="/"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          active-class="text-blue-600 bg-blue-50"
          @click="toggleMobileMenu"
        >
          Upcoming Launches
        </router-link>

        <router-link
          to="/recent"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
          active-class="text-blue-600 bg-blue-50"
          @click="toggleMobileMenu"
        >
          Recent Launches
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Rocket, Menu, X } from "lucide-vue-next";

const mobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
