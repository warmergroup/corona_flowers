<script setup lang="ts">
import {sidebarItems} from "~/constants";

const route = useRoute();
</script>

<template>
  <NuxtLink v-for="(item, index) in sidebarItems" :key="index" :to="item.url">
    <UButton
      :class="[
        'w-full h-12 gap-2 transition-all duration-300',
        route.fullPath === item.url ? 'bg-blue-600 text-white shadow-lg scale-105'  : 'hover:bg-blue-200 dark:hover:bg-gray-700 hover:shadow-lg hover:scale-105'
      ]"
      :icon="item.icon"
      :variant="route.fullPath === item.url ? 'solid' : 'ghost'"
      color="blue">

      <span>{{ item.name }}</span>
    </UButton>
  </NuxtLink>
</template>
