<script setup lang="ts">
import {useConfirm} from '~/hooks/use-confirm';
import {useImageStore} from '~/store/image.store';
import {useGetImagesQuery} from "~/query/images/getImages";


const imageStore = useImageStore();
const confirm = useConfirm();
const currentPage = ref(1);
const itemsPerPage = 12;
const totalItems = ref(0);

const {isLoading, error, refetch} = useGetImagesQuery(currentPage, itemsPerPage, totalItems);

watch(currentPage, () => {
  refetch();
});

const emit = defineEmits(['select-image']);

const isLocalOpen = computed({
  get: () => confirm.isOpen && confirm.modalType === "imageSlideover",
  set: (value) => (confirm.isOpen = value),
});

const images = computed(() => imageStore.images);

const selectImage = (url: string) => {
  emit('select-image', url); // Tanlangan rasm URL sini uzatish
  confirm.onClose();
};
</script>

<template>
  <USlideover v-model="isLocalOpen">
    <div class="flex flex-col p-2">
      <div class="flex gap-2 my-2">
        <UButton icon="i-heroicons-x-mark" class="h-8 w-8" variant="ghost" color="blue" @click="confirm.onClose()"/>
        <h1 class="xl:text-3xl lg:text-2xl md:text-base sm:text-sm font-bold text-center">Rasmlar</h1>
      </div>
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-2 md:gap-3 h-[80vh] overflow-y-auto">
        <SharedImageSceleton v-if="isLoading" v-for="index in 12" :key="index"/>
        <div
          v-for="(image, index) in images" :key="index"
          class="card-animation w-full h-full transition-all duration-500 hover:shadow-xl">
          <div class="w-full aspect-[3/4] rounded-md group overflow-hidden">
            <NuxtImg :src="image.fileUrl" alt="image"
                     class="transition-all duration-500 hover:scale-105 object-cover w-full h-full"
                     loading="lazy"
                     @click="selectImage(image.fileUrl)"/>
          </div>
        </div>
      </div>
      <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
        <UPagination
          :active-button="{ color:'blue' }"
          :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
          v-model="currentPage"
          :max="5"
          :total="totalItems"
          sibling-count="1"
          :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
          :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
        />
      </div>
    </div>
  </USlideover>
</template>

<style scoped>
.card-animation {
  opacity: 0;
  animation: fade-in 600ms forwards;
  animation-delay: calc(0.1s * var(--i));
}

.card-animation:nth-of-type(even) {
  --i: 1;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>