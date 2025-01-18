<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useAuth } from "~/hooks/use-auth";
import { useMutation } from "@tanstack/vue-query";
import { useAuthStore } from "~/store/auth.store";
import $axios from "~/http";

const auth = useAuth();
const authStore = useAuthStore();
const toast = useToast();

const state = reactive({
    email: "" as string,
});
const isSuccess = ref(false);

const validate = (): FormError[] => {
    const errors: FormError[] = [];
    if (!state.email) errors.push({ path: "email", message: "E-mailni kiriting" });
    return errors;
};

const extractErrorMessage = (error: any) => {
    if (error.response?.data?.details?.errors?.length) {
        return error.response.data.details.errors[0].msg;
    } else if (error?.response?.data?.message) {
        return error.response.data.message;
    } else {
        return 'Xatolik yuz berdi';
    }
};

const { mutate, isPending, error } = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: async (values: { email: string }) => {
        const { data } = await $axios.post(`/auth/forgot-password`, values);
        return data;
    },
    onSuccess: () => {
        isSuccess.value = true;
        toast.add({
            description: `Emailingizga parolni tiklash so'rovi yuborildi! Iltimos email xabarlaringizni tekshiring`,
            icon: 'heroicons-outline:checkmark-circle-outline',
        });
    },
});

const onSubmit = (event: FormSubmitEvent<FormData>) => {
    event.preventDefault();
    mutate({ email: state.email! });
};
</script>

<template>
    <h1 class="text-2xl font-bold text-center">Parolni tiklash</h1>
    <template v-if="isSuccess">
        <div class="text-xl text-gray-200 mt-2">
            Parolni tiklash uchun emailingizga xabar yuborildi, Emailingizni tekshiring
        </div>
    </template>
    <template v-else>
        <div v-if="error">
            <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
                icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
                :title="extractErrorMessage(error)" />
        </div>
        <UForm :validate="validate" :state="state" @submit.prevent="onSubmit" class="space-y-6">
            <div class="text-xl text-neutral-500">
                Hali ro'yxatdan o'tmadingizmi?
                <span role="button" class="text-blue-500 hover:underline" @click="auth.setAuth('register')">
                    Ro'yxatdan o'tish
                </span>
            </div>

            <UFormGroup label="Email" name="email">
                <UInput v-model="state.email" type="text" placeholder="example@gmail.com" color="blue"
                    :disabled="isPending" />
            </UFormGroup>

            <UButton size="xl" type="submit" color="blue" label="kirish" :loading="isPending" />
        </UForm>
    </template>
</template>
