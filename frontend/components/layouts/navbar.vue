<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";
import { useCollapseStore } from "~/store/collapse.store";

const authStore = useAuthStore();
const collapseStore = useCollapseStore();

const isCollapsed = computed(() => collapseStore.isCollapsed);

const handleToggleSidebar = () => {
  collapseStore.toggleCollapse();
};
</script>

<template>
  <header
    class="xl:px-10 lg:px-8 sm fixed top-0 left-0 w-full z-50 bg-blue-50 dark:bg-gray-800 shadow border-b border-gray-300 dark:border-transparent flex gap-3 items-center justify-between">
    <div class="w-full h-full flex justify-between items-center p-2">
      <div class="flex items-center gap-2">
        <NuxtLink to="/" class="flex items-center justify-center gap-2">
          <div class="rounded-full overflow-hidden w-11 h-11">
            <NuxtImg class="w-full h-full object-cover transform scale-150" src="circular_brend.webp" />
          </div>
          <p class="hidden sm:block xl:text-2xl lg:text-xl md:text-base font-bold dark:text-white">
            Dashboard
          </p>
        </NuxtLink>
        <UButton size="lg" color="blue" variant="ghost"
          :icon="isCollapsed ? 'material-symbols:menu' : 'material-symbols:close'" @click="handleToggleSidebar" />
      </div>

      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="flex items-center justify-between gap-3">

          <template v-if="authStore.isLoading">
            <div class="flex justify-center items-center rounded-full">
              <Icon class="w-9 h-9" name="line-md:loading-loop" />
            </div>
          </template>
          <template v-else>
            <UiUserBox v-if="authStore.isAuth" :user="authStore.user" />
            <NuxtLink v-else to="/auth">
              <UButton label="Login" class="rounded-full font-bold" size="lg" color="blue" variant="soft" />
            </NuxtLink>
          </template>
          <SharedColorMode />
        </div>
      </div>
    </div>
  </header>
</template>
