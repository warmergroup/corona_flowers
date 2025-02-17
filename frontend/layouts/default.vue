<script setup lang="ts">
import { computed } from 'vue';
import { useCollapseStore } from '~/store/collapse.store';

const collapseStore = useCollapseStore();
const isCollapsed = computed(() => collapseStore.isCollapsed);
</script>

<template>
  <div class="">
    <LayoutsNavbar />
    <layoutsSidebar :class="isCollapsed ? 'translate-x-[-120%]' : 'translate-x-0'" class="sidebar" />

    <section :class="{ 'mx-3': isCollapsed, 'ml-72 mr-3': !isCollapsed }"
      class="mt-20 transition-all duration-300 section-height overflow-hidden relative bg-blue-50 dark:bg-gray-800 rounded-md p-2">
      <slot />
    </section>

  </div>
</template>

<style scoped>
.sidebar {
  @apply transform transition-transform duration-300;
}

.section-height {
  height: calc(100vh - 100px);
}
</style>
