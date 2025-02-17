<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import {getUsedStorage} from '~/utils/storageUtils';

// Total storage in GB (2 GB = 2048 MB)
const totalStorageMB = 2048;

const usedStorage = ref(0);
const remainingStorage = computed(() => totalStorageMB - usedStorage.value);

onMounted(async () => {
  usedStorage.value = Math.round((await getUsedStorage()) / (1024 * 1024)); // Convert bytes to MB
});
</script>

<template>
  <UMeterGroup :max="totalStorageMB">
    <template #indicator>
      <p class="text-gray-500 dark:text-gray-400 mt-2">Total Storage: 2 GB</p>
      <div class="flex gap-1.5 justify-between text-sm">
        <p>{{ usedStorage }} MB used</p>
        <p class="text-gray-500 dark:text-gray-400">
          {{ remainingStorage }} MB remaining
        </p>
      </div>
    </template>
    <UMeter size="sm" :value="usedStorage" color="blue" label="Used Storage" icon="icon-park-outline:solid-state-disk"/>
  </UMeterGroup>
</template>

<style scoped>
/* Stil kodlari */
</style>
