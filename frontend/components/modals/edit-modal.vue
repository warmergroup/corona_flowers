<script setup lang="ts">
import { useConfirm } from "~/hooks/use-confirm";
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useProductStore } from "~/store/product.store";
import $api from "~/http/api";
import { useMutation } from "@tanstack/vue-query";

const confirm = useConfirm();
const productStore = useProductStore();
const toast = useToast();

const picture = ref<File | null>(null);

const isLocalOpen = computed({
    get: () => confirm.isOpen && confirm.modalType === "edit",
    set: (value) => (confirm.isOpen = value),
});

const title = computed({
    get: () => confirm.product?.title,
    set: (value) => (confirm.product.title = value),
});
const description = computed({
    get: () => confirm.product?.description,
    set: (value) => (confirm.product.description = value),
});

const validate = (state: any): FormError[] => {
    const errors = [];
    if (!state.title) errors.push({ path: "title", message: "Nomi bo'sh bo'lmasligi kerak" });
    if (!state.description) errors.push({ path: "description", message: "Tavsifi bo'sh bo'lmasligi kerak" });
    return errors;
};

const onFileChange = async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    picture.value = file as File;
};

interface FormData {
    title: string;
    description: string;
}

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
    mutationKey: ["edit-product"],
    mutationFn: async () => {
        if (!confirm.product || !confirm.product._id) {
            throw new Error("Maxsulot topilmadi");
        }
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("description", description.value);
        if (picture.value) {
            formData.append("picture", picture.value);
        }
        const { data } = await $api.put(`/product/edit/${confirm.product._id}`, formData);
        return data;
    },
    onSuccess(data) {
        productStore.updateProduct(data);
        toast.add({
            title: "Tahrirlash",
            description: "Tahrirlash muvaffaqiyatli amalga oshirildi",
            icon: "material-symbols:edit-rounded",
        });
        confirm.onClose();
    },
});

const onSubmit = async (event: FormSubmitEvent<FormData>) => {
    event.preventDefault();
    mutate();
};
</script>

<template>
    <UModal v-model="isLocalOpen" title="Mahsulotni tahrirlash">
        <UCard>
            <h1 class="text-center font-bold text-2xl">Mahsulot tahrirlash</h1>
            <div v-if="error">
                <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
                    icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
                    :title="extractErrorMessage(error)" />
            </div>
            <UForm :validate="validate" :state="{ title: title, description: description }" class="space-y-4 m-4"
                @submit.prevent="onSubmit">
                <UFormGroup label="Maxsulot nomi" name="title">
                    <UInput placeholder="Nomini yozing" v-model="title" color="blue" size="lg" :disabled="isPending" />
                </UFormGroup>
                <UFormGroup label="Maxsulot tavsifi" name="description">
                    <UTextarea autoresize placeholder="Tavsifini yozing" v-model="description" color="blue" size="lg"
                        :disabled="isPending" />
                </UFormGroup>
                <UFormGroup label="Rasm tanlang" name="picture">
                    <UInput :onchange="onFileChange" type="file" color="blue" size="lg" :disabled="isPending" />
                </UFormGroup>
                <UButton class="w-1/3 flex justify-center items-center" icon="material-symbols:edit-rounded"
                    label="Tahrirlash" type="submit" :loading="isPending" color="blue" />
            </UForm>
        </UCard>
    </UModal>
</template>
