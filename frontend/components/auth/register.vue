<script lang="ts" setup>
import {useMutation} from "@tanstack/vue-query";
import {useAuth} from "~/hooks/use-auth";
import $axios from "~/http";

import {useAuthStore} from '~/store/auth.store';
import {validateRegister, extractErrorMessage} from '~/utils/formUtils';

const auth = useAuth();
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const state = reactive({
  name: "" as string,
  email: "" as string,
  password: "" as string,
  confirmPassword: "" as string,
});

interface FormData {
  userName: string;
  email: string;
  password: string;
}

const {mutate, isPending, error} = useMutation({
  mutationKey: ['register'],
  mutationFn: async (values: FormData) => {
    const {data} = await $axios.post(`/auth/register`, values);
    return data;
  },
  onSuccess: (data) => {
    try {
      authStore.setUser(data.user);
      authStore.setIsAuth(true);
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
      toast.add({
        title: 'Xush kelibsiz',
        description: `Ro'yxatdan muvaffaqiyatli o'tdingiz`,
        color: 'green',
        icon: 'i-heroicons-check-circle-solid',
      });
    } catch (error) {
      toast.add({
        title: 'Xush kelibsiz',
        description: 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
        color: 'red',
        icon: 'i-heroicons-x-mark-20-solid',
      });
    }
  },
});


const onSubmit = (event: any) => {
  event.preventDefault();
  mutate({userName: state.name!, email: state.email!, password: state.password!});
};
</script>

<template>
  <h1 class="text-2xl font-bold text-center">Ro'yxatdan o'tish</h1>
  <div v-if="error">
    <SharedAlert :message="extractErrorMessage(error)"/>
  </div>
  <UForm :validate="validateRegister.bind(null, state)" :state="state" @submit.prevent="onSubmit" class="space-y-6">
    <div class="text-xl text-neutral-500">
      Allaqachon hisobingiz bormi?
      <span role="button" class="text-blue-500 hover:underline" @click="auth.setAuth('login')">Kirish</span>
    </div>
    <UFormGroup label="Ism" name="userName">
      <UInput v-model="state.name" type="text" placeholder="Masalan: Ali" color="blue" :disabled="isPending"/>
    </UFormGroup>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="email" placeholder="example@gmail.com" color="blue" :disabled="isPending"/>
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" placeholder="••••••••" color="blue" :disabled="isPending"/>
    </UFormGroup>
    <UFormGroup label="Confirm Password" name="confirmPassword">
      <UInput v-model="state.confirmPassword" type="password" placeholder="••••••••" color="blue"
              :disabled="isPending"/>
    </UFormGroup>
    <UButton type="submit" color="blue" label="Ro'yxatdan o'tish" :loading="isPending"/>
  </UForm>
</template>
