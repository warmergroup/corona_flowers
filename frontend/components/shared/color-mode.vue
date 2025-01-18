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
  <UButton :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'" color="gray" size="lg"
    variant="ghost" aria-label="Theme" @click="toggleDarkMode"
    class="bg-gray-700 text-white border border-gray-500 hover:bg-gray-400" />
</template>
