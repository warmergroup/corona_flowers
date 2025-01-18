<script setup lang="ts">
import { useCreateProduct } from "~/hooks/use-create-product";
import { useProductStore } from "~/store/product.store";
import { useMutation } from "@tanstack/vue-query";
import $api from "~/http/api";
import type { FormError, FormSubmitEvent } from "#ui/types";

const createProduct = useCreateProduct();
const productStore = useProductStore();
const toast = useToast();

const picture = ref<File | null>(null);

const isLocalOpen = computed({
  get: () => createProduct.isOpen,
  set: (value) => (createProduct.isOpen = value),
});

const state = ref({
  title: "",
  description: "",
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
  mutationKey: ["create-product"],
  mutationFn: async () => {
    productStore.setLoading(true);
    const { title, description } = state.value;
    if (!picture.value) {
      throw new Error("Rasmni tanlash kerak");
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("picture", picture.value);
    const { data } = await $api.post('/product/create', formData);
    return data;
  },
  onSuccess(data) {
    productStore.addProduct(data.data);
    state.value.title = '';
    state.value.description = '';
    picture.value = null;
    createProduct.onClose();
    toast.add({
      title: "Maxsulot yaratildi",
      description: "Maxsulot muvaffaqiyatli yaratildi",
      icon: "material-symbols:add-circle-outline-rounded",
    });
    productStore.setLoading(false);
  },
  onError(error) {
    console.log(error);
  },
});

const onSubmit = async (event: FormSubmitEvent<FormData>) => {
  event.preventDefault();
  mutate();
};
</script>

<template>
  <UModal v-model="isLocalOpen" title="Maxsulot yaratish">
    <h1 class="text-center font-bold text-2xl mt-2">Maxsulot yaratish</h1>
    <UCard>
      <div v-if="error">
        <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
          icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
          :title="extractErrorMessage(error)" />
      </div>
      <UForm :validate="validate" :state="state" class="space-y-4 m-4" @submit.prevent="onSubmit">
        <UFormGroup label="Maxsulot nomi" name="title">
          <UInput placeholder="Nomini yozing" v-model="state.title" color="blue" size="lg" :disabled="isPending" />
        </UFormGroup>
        <UFormGroup label="Maxsulot tavsifi" name="description">
          <UTextarea autoresize placeholder="Tavsifini yozing" v-model="state.description" color="blue" size="lg"
            :disabled="isPending" />
        </UFormGroup>
        <UFormGroup label="Rasm tanlang" name="picture">
          <UInput :onchange="onFileChange" type="file" color="blue" size="lg" :disabled="isPending" />
        </UFormGroup>
        <UButton class="w-1/3 flex justify-center items-center" label="Qo'shish" type="submit" :loading="isPending"
          color="blue" />
      </UForm>
    </UCard>
  </UModal>
</template>
