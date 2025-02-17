<script lang="ts" setup>
import {useProductStore} from '~/store/product.store';
import {useConfirm} from '~/hooks/use-confirm';
import {extractErrorMessage} from '~/utils/formUtils';
import type {IProduct} from "~/interfaces";
import {useGetProductsQuery} from "~/query/product/getProducts";
import {useAuth} from "~/hooks/use-auth";
import {useAuthStore} from "~/store/auth.store";

useHead({title: 'Tovarlar | Corona Flowers'});

const {isLoading, error} = useGetProductsQuery();
const authStore = useAuthStore()
const productStore = useProductStore();
const confirm = useConfirm();
const router = useRouter();
const products = computed(() => productStore.products);

const navigateToCreateProduct = (): void => {
  router.push('/products/new');
};

const navigateToEditProduct = (id: string): void => {
  router.push(`/products/edit/${id}`);
};

const actionItems = (product: IProduct) => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['E'],
    click: () => {
      navigateToEditProduct(product._id);
    },
  }],
  [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['D'],
    click: () => {
      confirm.onOpen('deleteProduct');
      confirm.setProduct(product);
    },
  }],
];

const columns = ref([
  {key: 'picture', label: 'Rasmi'},
  {key: 'title', label: 'Nomi'},
  {key: 'price', label: 'Narxi'},
  {key: 'stock', label: 'Miqdori'},
  {key: 'size', label: "O'lchami"},
  {key: 'createdAt', label: "Qo'shilgan"},
  {key: 'updatedAt', label: "O'zgartirilgan"},
  {key: 'category', label: 'Kategoriya'},
  {key: 'status', label: 'Status'},
  {key: 'actions', label: 'Actions'},
]);

</script>

<template>
  <div class="container mx-auto overflow-auto">
    <div class="mx-auto w-1/2" v-if="error">
      <SharedAlert :message="extractErrorMessage(error)"/>
    </div>
    <UiTable
      :items="products"
      :columns="columns"
      searchKey="title"
      :actionItems="actionItems as any"
      :isLoading="isLoading"
      tableTitle="maxsulot"
    >
      <template #create-button>
        <UButton icon="i-heroicons-plus" color="blue" @click="navigateToCreateProduct" label="Mahsulot qo'shish"/>
      </template>
    </UiTable>
    <ModalsDeleteModal
      modalType="deleteProduct"
      title="mahsulot"
      :entityId="confirm.product?._id"
      deleteEndpoint="product"
      :removeEntity="productStore.removeProduct"
    />
  </div>
</template>
