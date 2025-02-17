<template>
  <ModalsCategoryModal
    modalType="createCategory"
    modalTitle="Kategoriya yaratish"
    endpoint="create"
    :defaultState="{ categoryName: '' }"
    :isEdit="false"
    onSuccessMessage="Kategoriya yaratildi"
  />
</template>

