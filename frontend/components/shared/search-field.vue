<script setup lang="ts">
const searchQuery = ref('')
</script>
<template>
  <div class="w-full max-w-md">
    <UInput
      v-model="searchQuery"
      icon="i-heroicons-magnifying-glass"
      placeholder="Search products..."
      class="w-full"
      @input="$emit('search', searchQuery)"
    />
  </div>
</template>