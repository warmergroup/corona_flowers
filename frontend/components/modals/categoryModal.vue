<script setup lang="ts">
import {useMutation} from '@tanstack/vue-query';
import {useCategoryStore} from '@/store/category.store';
import {reactive, computed, watch} from 'vue';
import {useConfirm} from '~/hooks/use-confirm';
import $api from '~/http/api';

const props = defineProps({
  modalType: String,
  modalTitle: String,
  endpoint: String,
  onSuccessMessage: String,
  isEdit: Boolean,
  categoryId: String,
});

const formData = reactive({categoryName: ''});
const confirm = useConfirm();
const categoryStore = useCategoryStore();
const toast = useToast();

const isLocalOpen = computed({
  get: () => confirm.isOpen && confirm.modalType === props.modalType,
  set: (value) => (confirm.isOpen = value),
});

// Watch store category va input qiymatini avtomatik yuklash
watch(() => confirm.category, (newCategory) => {
  if (props.isEdit && newCategory) {
    formData.categoryName = newCategory.categoryName || '';
  }
});

const resetForm = () => {
  formData.categoryName = '';
};

const onCloseModal = () => {
  resetForm();
  confirm.onClose();
};

const {mutate, isPending, error} = useMutation({
  mutationKey: [`category-${props.endpoint}`],
  mutationFn: async () => {
    const url = props.isEdit ? `/category/${props.endpoint}/${props.categoryId}` : `/category/${props.endpoint}`;
    const method = props.isEdit ? 'put' : 'post';
    const response = await $api[method](url, {categoryName: formData.categoryName});
    return response.data;
  },
  onSuccess(data) {
    if (props.isEdit) {
      categoryStore.updateCategory(data.data);
    } else {
      categoryStore.addCategory(data);
    }
    onCloseModal();
    toast.add({
      title: props.onSuccessMessage,
      description: 'Operatsiya muvaffaqiyatli bajarildi',
      icon: props.isEdit ? 'material-symbols:edit-rounded' : 'material-symbols:add-circle-outline-rounded',
    });
  },
});

const onSubmit = (event: Event) => {
  event.preventDefault();
  if (!formData.categoryName.trim()) {
    toast.add({
      title: 'Xato!',
      description: 'Kategoriya nomi majburiy!',
      icon: 'material-symbols:error-outline-rounded',
    });
    return;
  }
  mutate();
};
</script>

<template>
  <UModal v-model="isLocalOpen" :title="modalTitle">
    <UCard>
      <h1 class="text-center font-bold text-2xl mt-2 mb-4">{{ modalTitle }}</h1>
      <div v-if="error">
        <SharedAlert :message="error.message"/>
      </div>
      <UForm :state="formData" @submit.prevent="onSubmit" class="space-y-4">
        <UFormGroup label="Kategoriya nomi" name="categoryName">
          <UInput
            placeholder="Nomini yozing"
            v-model="formData.categoryName"
            color="blue"
            size="sm"
            :disabled="isPending"
          />
        </UFormGroup>
        <div class="grid grid-cols-2 gap-2">
          <UButton class="flex justify-center items-center" label="Bekor qilish" color="red" @click="onCloseModal"/>
          <UButton class="flex justify-center items-center" label="Qo'shish" type="submit" :loading="isPending"
                   color="blue"/>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>

<style scoped>
.grid {
  display: grid;
  gap: 1rem;
}
</style>
