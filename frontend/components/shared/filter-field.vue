<script setup lang="ts">
const selectedType = ref('')
const selectedBrand = ref('')
const selectedCondition = ref('')

const productTypes = ['Electronics', 'Clothing', 'Books', 'Home']
const brands = ['Apple', 'Samsung', 'Sony', 'LG']
const conditions = ['New', 'Used', 'Refurbished']

const emit = defineEmits(['filter'])

function emitFilters() {
  emit('filter', {
    type: selectedType.value,
    brand: selectedBrand.value,
    condition: selectedCondition.value
  })
}
</script>

<template>
  <div class="flex gap-2">
    <USelect
      v-model="selectedType"
      :options="productTypes"
      placeholder="Product Type"
      class="w-40"
      @update:model-value="emitFilters"
    />
    <USelect
      v-model="selectedBrand"
      :options="brands"
      placeholder="Brand"
      class="w-40"
      @update:model-value="emitFilters"
    />
    <USelect
      v-model="selectedCondition"
      :options="conditions"
      placeholder="Condition"
      class="w-40"
      @update:model-value="emitFilters"
    />
  </div>
</template>