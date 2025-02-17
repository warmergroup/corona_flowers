<script setup lang="ts">
const props = defineProps<{ status: boolean }>();

const statusClass = computed(() => (props.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'));
</script>
<template>
  <span :class="statusClass" class="px-2 py-1 rounded">
    {{ status ? 'Active' : 'Inactive' }}
  </span>
</template>

