<template>
  <USkeleton v-if="!url" class="w-16 h-16 rounded-md bg-gray-800"/>
  <NuxtImg v-else :src="url" alt="Picture" loading="lazy" class="h-16 w-16 object-cover rounded"/>
</template>

<script setup lang="ts">
const props = defineProps<{ url?: string }>();
</script>
