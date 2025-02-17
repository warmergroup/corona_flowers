<script lang="ts" setup>
import {ref, watch} from 'vue';

const props = defineProps<{ message: string }>();
const alertMessage = ref(props.message);

const handleClose = () => {
  alertMessage.value = null;
};

watch(() => props.message, (newMessage) => {
  alertMessage.value = newMessage;
});
</script>

<template>
  <div v-if="alertMessage" class="mb-4">
    <UAlert
      :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
      icon="material-symbols:brightness-alert-rounded"
      color="red"
      variant="outline"
      :title="alertMessage"
      @close="handleClose"
    />
  </div>
</template>
