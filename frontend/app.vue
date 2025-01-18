  <script lang="ts" setup>
  import { useAuthStore } from './store/auth.store';
  import $axios from './http';

  const authStore = useAuthStore();
  const toast = useToast();

  const checkAuth = async () => {
    authStore.setIsLoading(true);
    try {
      const { data } = await $axios.get('/auth/refresh');
      localStorage.setItem('accessToken', data.accessToken);
      authStore.setIsAuth(true);
      authStore.setUser(data.user);
    } catch (error: any) {
      toast.add({
        title: 'Xatolik',
        description: `${error.response?.data?.message || 'Nomaʼlum xatolik yuz berdi'}`
      })
    } finally {
      authStore.setIsLoading(false);
    }
  };

  onMounted(async () => {
    if (localStorage.getItem("accessToken")) {
      await checkAuth();
    } else {
      authStore.setIsLoading(false);
    }
  });
</script>
  <template>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </template>