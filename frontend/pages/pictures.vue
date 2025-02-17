<script lang="ts" setup>
import {useGetImagesQuery} from '~/query/images/getImages';
import {useConfirm} from '~/hooks/use-confirm';
import {extractErrorMessage} from '~/utils/formUtils';
import {useImageStore} from '~/store/image.store';

useHead({title: 'Rasmlar | Corona Flowers'});

const imageStore = useImageStore();
const confirm = useConfirm();
const currentPage = ref(1);
const itemsPerPage = 12;
const totalItems = ref(0);

const {isLoading, error, refetch} = useGetImagesQuery(currentPage, itemsPerPage, totalItems);

watch(currentPage, () => {
  refetch();
});

const images = computed(() => imageStore.images);

const openPreviewModal = (url: string) => {
  confirm.setPreviewImageUrl(url);
  confirm.onOpen('previewModal');
};

</script>


<template>
  <div class="w-full h-full">
    <div class="flex justify-between items-center p-3">
      <h1 class="xl:text-3xl lg:text-2xl md:text-base sm:text-sm font-bold text-center">Rasmlar</h1>
      <UButton label="Qo'shish" color="blue" @click="confirm.onOpen('createImage')"/>
    </div>

    <div v-if="error">
      <SharedAlert :message="extractErrorMessage(error)"/>
    </div>
    <div v-else class="container mx-auto overflow-y-auto h-[65vh]">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pr-3  gap-4">
        <div
          v-for="(image, index) in images" :key="index"
          class="card-animation flex bg-white dark:bg-gray-900 flex-col shadow-md transition-all duration-500 hover:shadow-xl gap-2 rounded-md overflow-hidden">
          <div class="flex-1 w-full rounded-md group overflow-hidden">
            <NuxtImg :src="image.fileUrl" :alt="image.fileUrl"
                     class="transition-all duration-500 hover:scale-110 object-cover w-full h-full" loading="lazy"/>
          </div>
          <div class="flex p-3 items-center justify-end gap-2">
            <UButton @click="openPreviewModal(image.fileUrl)" color="blue" variant="outline"
                     icon="icon-park-twotone:preview-open"/>
            <UButton @click="confirm.onOpen('deleteImage'); confirm.setImage(image);" color="red"
                     icon="ic:baseline-delete"/>
          </div>
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

  <ModalsCreateImageModal/>
  <ModalsPreviewModal/>
  <ModalsDeleteModal modalType="deleteImage"
                     title="rasm"
                     :entityId="confirm.image?._id"
                     deleteEndpoint="images"
                     :removeEntity="imageStore.removeImage"/>
</template>

<style scoped>
.container {
  max-width: 1200px;
  overflow-y: auto;
}

.card-animation {
  opacity: 0;
  animation: fade-in 600ms forwards;
  animation-delay: calc(0.5s * var(--i));
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
