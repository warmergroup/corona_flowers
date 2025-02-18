<script lang="ts" setup>
import {useAuthStore} from "~/store/auth.store";
import $axios from "~/http";

const authStore = useAuthStore()
const toast = useToast();

const checkAuth = async () => {
  authStore.setIsLoading(true);
  try {
    const {data} = await $axios.get('/auth/refresh');
    console.log('data: ', data)
    localStorage.setItem('accessToken', data.accessToken);
    authStore.setIsAuth(true);
    authStore.setUser(data.user);
  } catch (error: any) {
    console.error("Auth check error:", error);
    toast.add({
      title: 'Xatolik',
      description: `${error.response?.data?.message || 'Nomaʼlum xatolik yuz berdi'}`
    })
  } finally {
    authStore.setIsLoading(false);
  }
};
onMounted(() => {
  if (localStorage.getItem("accessToken")) {
    checkAuth();
  } else {
    authStore.setIsLoading(false);
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage/>
    <UNotifications/>
  </NuxtLayout>
</template>