<script setup lang="ts">
import {useMutation} from '@tanstack/vue-query';
import $api from '~/http/api';
import type {FormSubmitEvent} from '#ui/types';
import {useProductStore} from '~/store/product.store';
import {useCategoryStore} from '~/store/category.store';
import {validateProduct, extractErrorMessage} from '~/utils/formUtils';
import {useConfirm} from "~/hooks/use-confirm";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const toast = useToast();

const picture = ref<File | null>(null);

const state = ref({
  title: '',
  description: '',
  price: 0,
  size: '',
  category: '',
  stock: 0,
  discount: 0,
  discountStart: '',
  discountEnd: '',
});

const resetForm = () => {
  state.value = {
    title: '',
    description: '',
    price: 0,
    size: '',
    category: '',
    stock: 0,
    discount: 0,
    discountStart: '',
    discountEnd: '',
  };
  picture.value = null;
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  picture.value = file as File;
};

const {mutate, isPending, error} = useMutation({
  mutationKey: ['create-product'],
  mutationFn: async () => {
    productStore.setLoading(true);
    const {title, description, price, size, category, stock, discount, discountStart, discountEnd} = state.value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('size', size);
    formData.append('category', category);
    formData.append('stock', stock.toString());
    formData.append('discount', discount.toString());
    formData.append('discountStart', discountStart);
    formData.append('discountEnd', discountEnd);
    formData.append('picture', picture.value as Blob);
    const {data} = await $api.post('/product/create', formData);
    return data;
  },
  onSuccess(data) {
    productStore.addProduct(data.data);
    resetForm();
    toast.add({
      title: 'Mahsulot yaratildi',
      description: 'Mahsulot muvaffaqiyatli yaratildi',
      icon: 'material-symbols:add-circle-outline-rounded',
    });
    productStore.setLoading(false);
  },
  onError(error) {
    console.log(error);
  },
});

const categories = computed(() => categoryStore.categories);

const onSubmit = (event: FormSubmitEvent<FormData>) => {
  event.preventDefault();
  mutate();
};
</script>

<template>
  <div class="container mx-auto">
    <UCard>
      <h1 class="text-center font-bold text-2xl mt-2 mb-4">Mahsulot yaratish</h1>
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <UForm :validate="validateProduct.bind(null, state)" :state="state" class="space-y-4" @submit.prevent="onSubmit">

        <UFormGroup label="Mahsulot nomi" name="title">
          <UInput placeholder="Nomini yozing" v-model="state.title" color="blue" size="sm" :disabled="isPending"/>
        </UFormGroup>

        <div class="grid grid-cols-2 gap-2">
          <div>
            <NuxtImg/>
            <UFormGroup label="Rasm tanlang" name="picture">
              <UButton label="Rasm tanlash" variant="outline" @click="confirm.onOpen('imageSlideover')"
                       color="blue"/>
            </UFormGroup>
          </div>
          <div class="grid gap-2">
            <UFormGroup label="Narxi" name="price">
              <UInput placeholder="Narxini kiriting" v-model="state.price" type="number" color="blue" size="sm"
                      :disabled="isPending"/>
            </UFormGroup>
            <UFormGroup label="O'lchami" name="size">
              <UInput placeholder="O'lchamini kiriting" type="number" v-model="state.size" color="blue" size="sm"
                      :disabled="isPending"/>
            </UFormGroup>
            <UFormGroup label="Miqdori" name="stock">
              <UInput placeholder="Miqdorini kiriting" type="number" v-model="state.stock" color="blue" size="sm"
                      :disabled="isPending"/>
            </UFormGroup>
          </div>
        </div>
        <UFormGroup label="Katalog" name="category">
          <select v-model="state.category" class="border rounded px-4 py-2 w-full" :disabled="isPending">
            <option v-for="category in categories" :key="category._id" :value="category.categoryName">
              {{ category.categoryName }}
            </option>
          </select>
        </UFormGroup>
        <UFormGroup label="Maxsulot tavsifi" name="description">
          <UTextarea autoresize placeholder="Tavsifini yozing" v-model="state.description" color="blue" size="sm"
                     :disabled="isPending"/>
        </UFormGroup>
        <div class="grid grid-cols-2 gap-2">
          <UButton class="flex justify-center items-center" label="Qo'shish" type="submit" :loading="isPending"
                   color="blue"/>
          <UButton class="flex justify-center items-center" label="Bekor qilish" color="red"
                   @click="resetForm"/>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
