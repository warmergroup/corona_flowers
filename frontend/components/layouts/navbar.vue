<script lang="ts" setup>
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();
</script>

<template>
  <div class="w-full h-16 dark:bg-gray-600 bg-gray-200 fixed top-0 inset-0 z-50">
    <div class="w-full h-full flex justify-between items-center p-2 container mx-auto">
      <NuxtLink to="/" class="flex items-center justify-center gap-2">
        <div class="rounded-full overflow-hidden w-16 h-16 my-2 relative">
          <NuxtImg class="w-full h-full object-cover transform scale-150" src="circular_brend.webp" />
        </div>
        <p class="font-bold text-2xl sm:text-3xl md:text-4xl text-pink-600">
          Corona Flowers
        </p>
      </NuxtLink>

      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="flex items-center justify-between gap-3">
          <SharedCreateButton />

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
  </div>
  <UiCreateProduct />
</template>
