<script setup lang="ts">
import {useMutation} from '@tanstack/vue-query';
import $api from '~/http/api';
import type {FormSubmitEvent} from '#ui/types';
import {validateImage, extractErrorMessage} from '~/utils/formUtils';
import {useConfirm} from "~/hooks/use-confirm";
import {useImageStore} from "~/store/image.store";

const confirm = useConfirm();
const imageStore = useImageStore();
const toast = useToast();

const state = reactive({
  image: null as File | null,
});

const isLocalOpen = computed({
  get: () => confirm.isOpen && confirm.modalType === "createImage",
  set: (value) => (confirm.isOpen = value),
});

const resetForm = () => {
  state.image = null;
};
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;
  state.image = file;
};

const {mutate, isPending, error} = useMutation({
  mutationKey: ['create-image'],
  mutationFn: async () => {
    imageStore.setLoading(true);
    const formData = new FormData();
    formData.append('image', state.image as Blob);
    const {data} = await $api.post('/images/create', formData);
    return data;
  },
  onSuccess(data) {
    imageStore.addImage(data.data);
    resetForm();
    confirm.onClose();
    toast.add({
      title: 'Rasm',
      description: 'Rasm muvaffaqiyatli yaratildi',
      icon: 'material-symbols:add-circle-outline-rounded',
    });
    imageStore.setLoading(false);
  },
  onError(error) {
    console.log(error);
  },
});

const onSubmit = (event: FormSubmitEvent<{ image: File | null }>) => {
  event.preventDefault();
  mutate();
};
</script>

<template>
  <UModal v-model="isLocalOpen">
    <UCard>
      <h1 class="text-center font-bold text-2xl mt-2 mb-4">Rasm yuklash</h1>
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <UForm :validate="validateImage.bind(null, state)" :state="state" class="space-y-4" @submit.prevent="onSubmit">

        <UFormGroup name="image">
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file"
                   class="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                  class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" @change="onFileChange"/>
            </label>
          </div>
        </UFormGroup>

        <div class="grid grid-cols-2 gap-2">
          <UButton class="flex justify-center items-center" label="Bekor qilish" color="red"
                   @click="() => { resetForm(); confirm.onClose(); }"/>
          <UButton class="flex justify-center items-center" label="Qo'shish" type="submit" :loading="isPending"
                   color="blue"/>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
