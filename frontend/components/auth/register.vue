<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";
import { useAuth } from "~/hooks/use-auth";
import $axios from "~/http";
import { useAuthStore } from '~/store/auth.store';

const auth = useAuth();
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const state = reactive({
    name: "" as string | undefined,
    email: "" as string | undefined,
    password: "" as string | undefined,
    confirmPassword: "" as string | undefined,
});

interface FormData {
    userName: string;
    email: string;
    password: string;
}

const validate = (): FormError[] => {
    const errors: FormError[] = [];
    if (!state.name) errors.push({ path: "userName", message: "Name is required" });
    if (!state.email) errors.push({ path: "email", message: "Email is required" });
    if (!state.password) errors.push({ path: "password", message: "Password is required" });
    if (!state.confirmPassword) errors.push({ path: "confirmPassword", message: "Confirm password is required" });
    if (state.password !== state.confirmPassword) errors.push({ path: "confirmPassword", message: "Passwords do not match" });
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
    mutationKey: ['register'],
    mutationFn: async (values: FormData) => {
        const { data } = await $axios.post(`/auth/register`, values);
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
            console.error('Error during success handling:', error);
        }
    },
});

const onSubmit = (event: FormSubmitEvent<FormData>) => {
    event.preventDefault();
    mutate({ userName: state.name!, email: state.email!, password: state.password! });
};
</script>

<template>
    <h1 class="text-2xl font-bold text-center">Ro'yxatdan o'tish</h1>
    <div v-if="error">
        <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
            icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
            :title="extractErrorMessage(error)" />
    </div>
    <UForm :validate="validate" :state="state" @submit.prevent="onSubmit" class="space-y-4">
        <div class="text-xl text-neutral-500">
            Allaqachon hisobingiz bormi?
            <span role="button" class="text-blue-500 hover:underline" @click="auth.setAuth('login')">
                Kirish
            </span>
        </div>
        <UFormGroup label="Ism" name="userName">
            <UInput v-model="state.name" type="text" placeholder="Masalan: Ali" color="blue" :disabled="isPending" />
        </UFormGroup>
        <UFormGroup label="Email" name="email">
            <UInput v-model="state.email" type="email" placeholder="example@gmail.com" color="blue"
                :disabled="isPending" />
        </UFormGroup>
        <UFormGroup label="Password" name="password">
            <UInput v-model="state.password" type="password" placeholder="••••••••" color="blue"
                :disabled="isPending" />
        </UFormGroup>
        <UFormGroup label="Confirm Password" name="confirmPassword">
            <UInput v-model="state.confirmPassword" type="password" placeholder="••••••••" color="blue"
                :disabled="isPending" />
        </UFormGroup>

        <UButton size="xl" type="submit" color="blue" label="Ro'yxatdan o'tish" :loading="isPending" />
    </UForm>
</template>
