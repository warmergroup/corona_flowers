<script setup lang="ts">
import {useConfirm} from "~/hooks/use-confirm";

const confirm = useConfirm();
const isLocalOpen = computed({
  get: () => confirm.isOpen && confirm.modalType === "previewModal",
  set: (value) => (confirm.isOpen = value),
});
</script>

<template>
  <UModal v-model="isLocalOpen">
    <NuxtImg v-if="confirm.previewImageUrl" :src="confirm.previewImageUrl" class="max-h-[90vh]"/>
  </UModal>
</template>
