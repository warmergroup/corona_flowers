<script setup lang="ts">
import {useMutation} from '@tanstack/vue-query';
import $api from '~/http/api';
import {useProductStore} from '~/store/product.store';
import {useCategoryStore} from '~/store/category.store';
import {useImageStore} from '~/store/image.store';
import {validateProduct, extractErrorMessage} from '~/utils/formUtils';
import {useConfirm} from '~/hooks/use-confirm';
import type {IProductState} from "~/interfaces";
import type {FormSubmitEvent} from "#ui/types";

const confirm = useConfirm();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const imageStore = useImageStore();
const router = useRouter();
const toast = useToast();

const categories = computed(() => categoryStore.categories);

const state = ref<IProductState>({
  title: '',
  description: '',
  price: 0,
  size: '',
  category: null,
  stock: 0,
  discount: 0,
  discountStart: null,
  discountEnd: null,
  pictureUrl: '',
});

const resetForm = () => {
  state.value = {
    title: '',
    description: '',
    price: 0,
    size: '',
    category: null,
    stock: 0,
    discount: 0,
    discountStart: null,
    discountEnd: null,
    pictureUrl: '',
  };
  imageStore.resetSelectedImage();
};

const clearImage = () => {
  imageStore.resetSelectedImage();
}
const prepareJSONData = (state: IProductState) => {
  const jsonData: Record<string, any> = {};
  Object.entries(state).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      jsonData[key] = key === 'category' && typeof value === 'object' ? value.value : value;
    }
  });
  return JSON.stringify(jsonData);
};

const {mutate, isPending, error} = useMutation({
  mutationKey: ['create-product'],
  mutationFn: async () => {
    productStore.setLoading(true);
    const jsonData = prepareJSONData(state.value);
    const {data} = await $api.post('/product/create', jsonData, {
      headers: {'Content-Type': 'application/json'},
    });
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
    router.push('/products');
  },
});

const handleSelectImage = (url: string) => {
  state.value.pictureUrl = url;
  imageStore.selectedImageUrl = state.value.pictureUrl;
};
const onSubmit = (event: FormSubmitEvent<IProductState>) => {
  event.preventDefault();
  if (!state.value.category) {
    alert('Iltimos, kategoriyani tanlang!');
    return;
  }
  mutate();
};
</script>

<template>
  <div class="container mx-auto h-full flex flex-col gap-4">
    <UForm :validate="validateProduct.bind(null, state)" :state="state" class="space-y-4 p-3"
           @submit.prevent="onSubmit">
      <UiFormHeader :isPending="isPending" @resetForm="resetForm"/>
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <div class="h-[65vh] overflow-y-auto">
        <UiFormBody :state="state" :categories="categories" :isPending="isPending"
                    @selectImage="confirm.onOpen('imageSlideover')"/>
      </div>
    </UForm>
    <SlideoverImage @select-image="handleSelectImage"/>
  </div>
</template>
