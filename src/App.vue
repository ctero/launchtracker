<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* Additional styles specific to the app layout if needed */
</style>
