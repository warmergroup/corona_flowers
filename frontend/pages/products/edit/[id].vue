<script setup lang="ts">
import {useProductStore} from "~/store/product.store";
import {useCategoryStore} from "~/store/category.store";
import {useImageStore} from "~/store/image.store";
import {useConfirm} from "~/hooks/use-confirm";
import type {IProductState} from "~/interfaces";
import type {FormSubmitEvent} from "#ui/types";
import {useMutation} from "@tanstack/vue-query";
import $api from "~/http/api";
import {extractErrorMessage} from "~/utils/formUtils";

const confirm = useConfirm();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const imageStore = useImageStore();
const router = useRouter();
const toast = useToast();
const categories = computed(() => categoryStore.categories);
const route = useRoute();
const productId = route.params.id as string;

const product = computed(() => productStore.getProductById(productId));

const state = ref<IProductState>({
  title: product.value?.title || "",
  description: product.value?.description || "",
  price: product.value?.price || 0,
  size: product.value?.size || "",
  category: product.value?.category || null,
  stock: product.value?.stock || 0,
  discount: product.value?.discount || 0,
  discountStart: product.value?.discountStart || null,
  discountEnd: product.value?.discountEnd || null,
  pictureUrl: product.value?.pictureUrl || "",
});

imageStore.selectedImageUrl = state.value.pictureUrl;

const resetForm = () => {
  state.value = {
    title: "",
    description: "",
    price: 0,
    size: "",
    category: null,
    stock: 0,
    discount: 0,
    discountStart: null,
    discountEnd: null,
    pictureUrl: "",
  };
  imageStore.resetSelectedImage();
};

const onClose = () => {
  resetForm();
  router.push("/products");
};

const prepareJSONData = (state: IProductState) => {
  const jsonData: Record<string, any> = {};
  Object.entries(state).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      jsonData[key] = key === "category" && typeof value === "object" ? value.value : value;
    }
  });
  return JSON.stringify(jsonData);
};

const {mutate, isPending, error} = useMutation({
  mutationKey: ["update-product"],
  mutationFn: async () => {
    productStore.setLoading(true);
    const jsonData = prepareJSONData(state.value);
    const {data} = await $api.put(`/product/edit/${productId}`, jsonData, {
      headers: {"Content-Type": "application/json"},
    });
    return data;
  },
  onSuccess: (data) => {
    productStore.updateProduct(data);
    onClose();
    toast.add({
      title: "Tahrirlash",
      description: "Tahrirlash muvaffaqiyatli amalga oshirildi",
      icon: "material-symbols:edit-rounded",
    });
    productStore.setLoading(false);
  },
});

const handleSelectImage = (url: string) => {
  state.value.pictureUrl = url;
  imageStore.selectedImageUrl = state.value.pictureUrl;
};

const onSubmit = (event: FormSubmitEvent<IProductState>) => {
  event.preventDefault();
  if (!state.value.category) {
    alert("Iltimos, kategoriyani tanlang!");
    return;
  }
  mutate();
};
</script>

<template>
  <div class="container mx-auto h-full flex flex-col gap-4">
    <UForm :state="state" class="space-y-4 p-3" @submit.prevent="onSubmit">
      <UiFormHeader title="Mahsulotni tahrirlash" @resetForm="resetForm"/>
      <div class="mx-auto w-1/2" v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <div class="h-[65vh] overflow-y-auto">
        <UiFormBody :state="state" :categories="categories" @selectImage="confirm.onOpen('imageSlideover')"/>
      </div>
    </UForm>
    <SlideoverImage @select-image="handleSelectImage"/>
  </div>
</template>
