<script lang="ts" setup>
import { useAuth } from '~/hooks/use-auth';
import { storeToRefs } from 'pinia';

const auth = useAuth();
const { authState } = storeToRefs(auth);
const router = useRouter();
const isLoading = ref(false);

onMounted(async () => {
  if (sessionStorage.getItem('accessToken')) {
    await router.push('/');
  } else {
    isLoading.value = true;
  }
});
</script>

<template>
  <div v-if="isLoading" class="w-full min-h-[80vh] flex justify-center items-center">
    <UCard class="w-1/2 p-3 dark:bg-gray-600 bg-gray-100">
      <AuthLogin v-if="authState === 'login'" />
      <AuthRegister v-if="authState === 'register'" />
      <AuthForgotPassword v-if="authState === 'forgot_password'" />
    </UCard>
  </div>
</template>
