<script setup lang="ts">
import {useCategoryStore} from '~/store/category.store';
import {useConfirm} from '~/hooks/use-confirm';
import type {ICategory} from "~/interfaces";
import {extractErrorMessage} from '~/utils/formUtils';
import {useGetCategorysQuery} from "~/query/category/getCategorys";

useHead({title: 'Kategoriyalar | Corona Flowers'});

const categoryStore = useCategoryStore();
const confirm = useConfirm();
const {isLoading, error} = useGetCategorysQuery()
const categories = computed(() => categoryStore.categories);

const actionItems = (category: ICategory) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      confirm.onOpen('editCategory');
      confirm.setCategory(category);
    },
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['D'],
    click: () => {
      confirm.onOpen('deleteCategory');
      confirm.setCategory(category);
    },
  }],
];

const columns = ref([
  {key: 'categoryName', label: 'Kategoriya Nomi'},
  {key: 'createdAt', label: "Qo'shilgan"},
  {key: 'updatedAt', label: "O'zgartirilgan"},
  {key: 'actions', label: 'Actions'},
]);
</script>

<template>
  <div class="container mx-auto overflow-auto">
    <div class="mx-auto w-1/2" v-if="error">
      <SharedAlert :message="extractErrorMessage(error)"/>
    </div>
    <UiTable
      :items="categories"
      :columns="columns"
      searchKey="categoryName"
      :actionItems="actionItems"
      :isLoading="isLoading"
      tableTitle="kategoriya"
    >
      <template #create-button>
        <UButton icon="i-heroicons-plus" color="blue" @click="() => { confirm.onOpen('createCategory') }"
                 label="Kategoriya qo'shish"/>

      </template>
    </UiTable>

    <ModalsEditCategoryModal/>
    <ModalsCreateCategoryModal/>
    <ModalsDeleteModal modalType="deleteCategory"
                       title="kategoriya"
                       :entityId="confirm.category?._id"
                       deleteEndpoint="category"
                       :removeEntity="categoryStore.removeCategory"/>
  </div>
</template>
