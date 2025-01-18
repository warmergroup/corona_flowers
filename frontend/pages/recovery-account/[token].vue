<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useMutation } from "@tanstack/vue-query";
import $axios from "~/http";

const router = useRouter();
const toast = useToast();
const token = router.currentRoute.value.params?.token;

const state = reactive({
    password: "" as string | undefined,
    confirmPassword: "" as string | undefined,
});
const showPassword = ref(false);
const showConfirmPassword = ref(false);

interface FormData {
    password: string;
}

const errors = ref<FormError[]>([]);

const validate = (): FormError[] => {
    const errors: FormError[] = [];
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
    mutationKey: ["recovery-account"],
    mutationFn: async (values: FormData) => {
        const obj = { password: values.password, token };
        const { data } = await $axios.put(`/auth/recovery-account`, obj);
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
    mutate({ password: state.password! });
};
</script>

<template>
    <div class="w-full min-h-[80vh] flex justify-center items-center">
        <UCard class="w-1/2 p-3 dark:bg-gray-800 bg-gray-100">
            <h1 class="text-2xl font-bold text-center">Yangi parol kiriting</h1>
            <div v-if="error">
                <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
                    icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
                    :title="extractErrorMessage(error)" />
            </div>
            <UForm :validate="validate" :state="state" @submit.prevent="onSubmit" class="space-y-4">
                <UFormGroup label="Yangi parol" name="password">
                    <div class="relative">
                        <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'"
                            placeholder="••••••••" color="blue" :disabled="isPending" />
                        <UButton type="button" color="gray" class="absolute inset-y-0 right-0"
                            @click="showPassword = !showPassword">
                            <UIcon :name="showPassword ? 'ci:show' : 'lets-icons:view-hide'" />
                        </UButton>
                    </div>
                </UFormGroup>
                <UFormGroup label="Yangi parolni tasdiqlang" name="confirmPassword">
                    <div class="relative">
                        <UInput v-model="state.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                            placeholder="••••••••" color="blue" :disabled="isPending" />
                        <UButton type="button" color="gray" class="absolute border border-none inset-y-0 right-0"
                            @click="showConfirmPassword = !showConfirmPassword">
                            <UIcon :name="showConfirmPassword ? 'ci:show' : 'lets-icons:view-hide'" />
                        </UButton>
                    </div>
                </UFormGroup>
                <UButton size="xl" type="submit" color="blue" label="Ro'yxatdan o'tish" :loading="isPending" />
            </UForm>
        </UCard>
    </div>
</template>
