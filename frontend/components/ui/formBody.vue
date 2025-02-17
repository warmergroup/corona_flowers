<template>
  <div class="p-3 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2  max-w-5xl mx-auto">
    <!-- Rasm komponenti bir ustunda -->
    <div>
      <UFormGroup name="pictureUrl">
        <div class="flex flex-col gap-4 w-64">
          <div
            class="flex w-full aspect-[3/4] justify-center items-center border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
            v-if="!state.pictureUrl">
            <UIcon class="h-full w-full text-gray-400" name="material-symbols:imagesmode-outline"/>
          </div>
          <NuxtImg v-if="state.pictureUrl" :src="state.pictureUrl" v-model="state.pictureUrl" alt="Tanlangan rasm"
                   class="w-full aspect-[3/4] object-cover"/>
        </div>
        <UButton class="mt-2" label="Rasm tanlash" variant="outline" @click="openSlideover()" color="blue"/>
      </UFormGroup>
    </div>

    <!-- Inputlar bir ustunda -->
    <div class="flex flex-col gap-4">
      <UFormGroup label="Mahsulot nomi" name="title">
        <UInput placeholder="Nomini yozing" v-model="state.title" color="blue" size="sm" :disabled="isPending"/>
      </UFormGroup>

      <UFormGroup label="Narxi" name="price">
        <UInput placeholder="Narxini kiriting" v-model="state.price" type="number" color="blue" size="sm"
                :disabled="isPending"/>
      </UFormGroup>

      <UFormGroup label="O'lchami" name="size">
        <UInput placeholder="O'lchamini kiriting" v-model="state.size" type="number" color="blue" size="sm"
                :disabled="isPending"/>
      </UFormGroup>

      <UFormGroup label="Miqdori" name="stock">
        <UInput placeholder="Miqdorini kiriting" v-model="state.stock" type="number" color="blue" size="sm"
                :disabled="isPending"/>
      </UFormGroup>

      <UFormGroup label="Katalog" name="category">
        <USelectMenu
          searchable
          searchable-placeholder="Kategoriya izlash..."
          placeholder="Kategoriya tanlash"
          :options="categories.map(category => ({ label: category.categoryName, value: category._id }))"
          v-model="state.category"
        />
      </UFormGroup>
    </div>

    <!-- Textarea butun kenglikda joylashadi -->
    <UFormGroup label="Mahsulot tavsifi" name="description" class="col-span-full">
      <UTextarea autoresize :rows="10" placeholder="Tavsifini yozing" v-model="state.description" color="blue"
                 :disabled="isPending"/>
    </UFormGroup>
  </div>
</template>

<script setup>
const props = defineProps({
  state: Object,
  categories: Array,
  isPending: Boolean,
});

const emit = defineEmits(['selectImage']);

const openSlideover = () => {
  emit('selectImage');
};
</script>
