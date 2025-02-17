<template>
  <UFormGroup :label="label" :name="name">
    <UInput :placeholder="placeholder" :value="modelValue" @input="updateValue" :type="type" :color="'blue'" size="sm"
            :disabled="isPending"/>
  </UFormGroup>
</template>

<script setup>
const props = defineProps({
  label: String,
  name: String,
  modelValue: [String, Number],
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  },
  isPending: Boolean
});
const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
};
</script>
