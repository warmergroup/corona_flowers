<!-- formHeader.vue -->
<template>
  <div class="sticky top-0 z-20 flex justify-between items-center p-2 rounded-md bg-white dark:bg-gray-600">
    <h1 class="font-bold text-xl md:text-base sm:text-sm">{{ title }}</h1>
    <div class="flex gap-2">
      <UButton variant="outline" label="Bekor qilish" color="red" @click="$emit('resetForm')" :loading="isPending"/>
      <UButton label="Saqlash" type="submit" :loading="isPending" color="blue"/>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isPending: Boolean,
  title: String
});
defineEmits(['resetForm', 'onClose',]);
</script>
