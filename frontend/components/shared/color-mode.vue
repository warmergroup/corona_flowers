<script setup lang="ts">
const colorMode = useColorMode();
const isDark = ref(false);

onMounted(() => {
  isDark.value = colorMode.value === "dark";
});

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  isDark.value = !isDark.value;
};
</script>

<template>
  <UButton :icon="isDark ? 'i-heroicons-sun-20-solid' : 'i-heroicons-moon-20-solid'" color="gray" size="sm"
           variant="ghost" aria-label="Theme" @click="toggleDarkMode"
           class="transition-all duration-500 bg-gray-500 text-white border border-gray-500 hover:bg-gray-400  hover:text-white"/>
</template>
