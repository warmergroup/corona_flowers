<script lang="ts" setup>
const props = defineProps({
  title: String
})
</script>

<template>
  <div class="flex justify-center items-center mx-auto w-full h-full">
    <div class="flex justify-center items-center ">
      <NuxtImg class="w-full" src="no-data.svg"/>
    </div>
    <div class="h-full">
      <p class="text-xl mb-4">{{ title }}lar topilmadi. </p>
    </div>
  </div>
</template>