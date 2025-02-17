<script lang="ts" setup>
import type {FormError, FormSubmitEvent} from "#ui/types";
import {useAuth} from "~/hooks/use-auth";
import {useMutation} from "@tanstack/vue-query";
import {useAuthStore} from "~/store/auth.store";
import $axios from "~/http";
import {validateEmail, extractErrorMessage} from "~/utils/formUtils";

const auth = useAuth();
const authStore = useAuthStore();
const toast = useToast();

const state = reactive({
  email: "" as string,
});
const isSuccess = ref(false);


const {mutate, isPending, error} = useMutation({
  mutationKey: ['forgot-password'],
  mutationFn: async (values: { email: string }) => {
    const {data} = await $axios.post(`/auth/forgot-password`, values);
    return data;
  },
  onSuccess: () => {
    isSuccess.value = true;
    toast.add({
      title: "Parolni tiklash so'rovi",
      description: `Emailingizga parolni tiklash so'rovi yuborildi! Iltimos email xabarlaringizni tekshiring`,
      icon: 'heroicons-outline:checkmark-circle-outline',
    });
  },
});

const onSubmit = (event: FormSubmitEvent<FormData>) => {
  event.preventDefault();
  mutate({email: state.email!});
};
</script>

<template>
  <h1 class="text-2xl font-bold text-center">Parolni tiklash</h1>
  <template v-if="isSuccess">
    <div class="text-xl text-gray-400 mt-2">
      Parolni tiklash uchun emailingizga xabar yuborildi, Emailingizni tekshiring
    </div>
  </template>
  <template v-else>
    <div v-if="error">
      <SharedAlert :message="extractErrorMessage(error)"/>
    </div>
    <SharedFormWrapper :validate="validateEmail.bind(null, state)" :state="state" @submit.prevent="onSubmit"
                       buttonLabel="Parolni tiklash"
                       :isPending="isPending">
      <div class="text-xl text-neutral-500">
        Hali ro'yxatdan o'tmadingizmi?
        <span role="button" class="text-blue-500 hover:underline" @click="auth.setAuth('register')">
          Ro'yxatdan o'tish
        </span>
      </div>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" type="text" placeholder="example@gmail.com" color="blue"
                :disabled="isPending"/>
      </UFormGroup>
    </SharedFormWrapper>
  </template>
</template>
