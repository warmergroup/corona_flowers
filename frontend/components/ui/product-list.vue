<script setup lang="ts">
import type {IProduct} from '~/interfaces';
import dayjs from 'dayjs';
import {useConfirm} from '~/hooks/use-confirm';
import {useAuthStore} from '~/store/auth.store';
import {useProductStore} from '~/store/product.store';

const confirm = useConfirm();
const authStore = useAuthStore();
const productStore = useProductStore();

const props = defineProps<{ product: IProduct }>();

const isLoading = computed(() => productStore.isLoading);

const onEdit = () => {
  confirm.onOpen("edit");
  confirm.setProduct(props.product);
};

const onDelete = () => {
  confirm.onOpen("delete");
  confirm.setProduct(props.product);
};

const isOwner = computed(() => authStore.user.id === props.product.author._id);
</script>

<template>
  <SharedLoader v-if="isLoading"/>
  <div v-else
       class="p-1 border flex items-start space-x-4 dark:bg-gray-800 dark:border-none bg-white">
    <div class="w-20 h-20">
      <USkeleton v-if="!props.product.picture || !props.product.picture.url"
                 class="w-full h-full rounded-md bg-gray-800"/>
      <NuxtImg v-else :src="props.product.picture.url" alt="Mahsulot rasmi" loading="lazy"
               class="w-full h-full object-cover rounded-md"/>
    </div>
    <div class="flex-1">
      <h2 class="text-lg font-semibold">{{ props.product.title }}</h2>
      <p class="text-base text-gray-300">{{ props.product.description }}</p>
      <p class="text-sm text-gray-500">
        Yaratilgan: {{ dayjs(props.product.createdAt).format("HH:mm | DD.MM.YYYY") }}
      </p>
      <p class="text-sm text-gray-500">Muallif: {{ props.product?.author?.userName }}</p>
    </div>
    <div class="my-auto flex gap-2">
      <UButton @click="onEdit" :disabled="!isOwner" label="Tahrirlash" color="yellow"
               icon="material-symbols:edit-rounded" :title="isOwner ? '' : `Faqat post egasi o'zgartirishi mumkin`"/>
      <UButton @click="onDelete" :disabled="!isOwner" label="O'chirish" color="red"
               icon="material-symbols:delete-outline" :title="isOwner ? '' : `Faqat post egasi o'chirishi mumkin`"/>
    </div>
  </div>
</template>
