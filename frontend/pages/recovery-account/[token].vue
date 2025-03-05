<script setup lang="ts">
import type {FormError, FormSubmitEvent} from "#ui/types";
import {useMutation} from "@tanstack/vue-query";
import $axios from "~/http";

import {validatePassword, extractErrorMessage} from "~/utils/formUtils";

const router = useRouter();
const toast = useToast();
const token = router.currentRoute.value.params?.token;

const state = reactive({
  password: "" as string,
  confirmPassword: "" as string,
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

interface FormData {
  password: string;
}

const {mutate, isPending, error} = useMutation({
  mutationKey: ["recovery-account"],
  mutationFn: async (values: FormData) => {
    const obj = {password: values.password, token};
    const {data} = await $axios.put(`/auth/recovery-account`, obj);
    return data;
  },
  onSuccess: () => {
    toast.add({
      title: "Tiklash",
      description: "Parol muvaffaqiyatli o'zgartirildi",
    });
    router.push("/auth");
  },
  onError: (error) => {
    console.log(error);
  }
});

const onSubmit = (event: FormSubmitEvent<FormData>) => {
  event.preventDefault();
  mutate({password: state.password!});
};
</script>

<template>
  <div class="w-full min-h-[80vh] flex justify-center items-center">
    <UCard class="w-1/2 p-3 dark:bg-gray-800 bg-gray-100">
      <h1 class="text-2xl font-bold text-center">Yangi parol kiriting</h1>
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <SharedFormWrapper :validate="validatePassword.bind(null, state)" :state="state" @submit.prevent="onSubmit"
                         buttonLabel="parolni tiklash" :isPending="isPending">
        <UFormGroup label="Yangi parol" name="password">
          <div class="relative">
            <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'"
                    placeholder="••••••••" color="blue" :disabled="isPending"/>
            <UButton type="button" color="gray" class="absolute inset-y-0 right-0"
                     @click="showPassword = !showPassword">
              <UIcon :name="showPassword ? 'ci:show' : 'lets-icons:view-hide'"/>
            </UButton>
          </div>
        </UFormGroup>
        <UFormGroup label="Yangi parolni tasdiqlang" name="confirmPassword">
          <div class="relative">
            <UInput v-model="state.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="••••••••" color="blue" :disabled="isPending"/>
            <UButton type="button" color="gray" class="absolute border border-none inset-y-0 right-0"
                     @click="showConfirmPassword = !showConfirmPassword">
              <UIcon :name="showConfirmPassword ? 'ci:show' : 'lets-icons:view-hide'"/>
            </UButton>
          </div>
        </UFormGroup>
      </SharedFormWrapper>
    </UCard>
  </div>
</template>
