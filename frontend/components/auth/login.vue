<script lang="ts" setup>
import { useAuth } from "~/hooks/use-auth";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth.store";
import $axios from "~/http";
import { validateLogin, extractErrorMessage } from '~/utils/formUtils';


const auth = useAuth();
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const state = reactive({
  email: "" as string,
  password: "" as string,
});

const { mutate, isPending, error } = useMutation({
  mutationKey: ['login'],
  mutationFn: async (values: { email: string, password: string }) => {
    const { data } = await $axios.post(`/auth/login`, values);
    return data;
  },
  onSuccess: (data) => {
    try {
      authStore.setUser(data.user);
      authStore.setIsAuth(true);
      // sessionStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
      toast.add({
        title: 'Kirish',
        description: 'Tizimga muvaffaqiyatli kirdingiz',
        color: 'green',
        icon: 'i-heroicons-check-circle-solid',
      });
    } catch (error) {
      toast.add({
        title: 'Kirish',
        description: 'Kirishda xatolik yuz berdi',
        color: 'red',
        icon: 'i-heroicons-x-mark-20-solid',
      });
    }
  },
});


const onSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  mutate({ email: state.email!, password: state.password! });
};
</script>

<template>
  <h1 class="text-2xl font-bold text-center">Kirish</h1>
  <div v-if="error">
    <SharedAlert :message="extractErrorMessage(error)" />
  </div>
  <SharedFormWrapper :validate="validateLogin.bind(null, state)" :state="state" @submit="onSubmit" buttonLabel="Kirish"
    :isPending="isPending">
    <div class="text-xl text-neutral-500">
      Hali ro'yxatdan o'tmadingizmi?
      <span role="button" class="text-blue-500 hover:underline" @click="auth.setAuth('register')">Ro'yxatdan
        o'tish</span>
    </div>
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" type="text" placeholder="example@gmail.com" color="blue" :disabled="isPending" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" placeholder="••••••••" color="blue" :disabled="isPending" />
    </UFormGroup>
    <div class="flex justify-end">
      <span class="text-xl text-blue-500 hover:underline" @click="auth.setAuth('forgot_password')">Parolni
        unutdingizmi?</span>
    </div>
  </SharedFormWrapper>
</template>