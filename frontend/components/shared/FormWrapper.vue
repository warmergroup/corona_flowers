<script lang="ts" setup>
import type {FormError, FormSubmitEvent} from "#ui/types";
import {defineProps, defineEmits} from 'vue';

interface Props {
  state: any;
  validate: () => FormError[];
  onSubmit: (event: FormSubmitEvent) => void;
  buttonLabel: string;
  isPending: boolean;
}

const props = defineProps<Props>();


const onSubmit = (event: FormSubmitEvent) => {
  event.preventDefault();
  props.onSubmit(event);
};
</script>
<template>
  <UForm :validate="validate" :state="state" @submit.prevent="onSubmit" class="space-y-6">
    <slot></slot>
    <UButton size="xl" type="submit" color="blue" :label="buttonLabel" :loading="isPending"/>
  </UForm>
</template>

