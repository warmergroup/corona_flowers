<script setup lang="ts">
import {useConfirm} from '~/hooks/use-confirm';

const confirm = useConfirm();
const state = reactive({categoryName: ''});

watch(
  () => confirm.category,
  (newCategory) => {
    state.categoryName = newCategory?.categoryName ?? '';
  }
);

</script>
<template>
  <ModalsCategoryModal
    modalType="editCategory"
    modalTitle="Kategoriyani tahrirlash"
    endpoint="update"
    onSuccessMessage="Kategoriya tahrirlandi"
    :defaultState="{ categoryName: state.categoryName }"
    :isEdit="true"
    :categoryId="confirm.category?._id"
  />
</template>
