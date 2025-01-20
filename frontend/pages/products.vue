<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';
import { useProductStore } from '~/store/product.store';
import $axios from '~/http';

useHead({ title: 'Bosh sahifa | Corona Flowers' });

const productStore = useProductStore();

const { isLoading, error } = useQuery({
    queryKey: ['get-product'],
    queryFn: async () => {
        const { data } = await $axios.get('product/get');
        productStore.setProducts(data);
        return data;
    },
});

const products = computed(() => productStore.products);
</script>

<template>
    <div class="container mx-auto">
        <div class="container mx-auto w-1/2">
            <UAlert v-if="error" class="mx-auto" title="Xatolik yuz berdi"
                :description="error?.message || 'Nomaʼlum xatolik yuz berdi'" color="rose" variant="outline"
                icon="material-symbols:brightness-alert-rounded" :close-button="{
                    icon: 'i-heroicons-x-mark-20-solid',
                    color: 'gray',
                    variant: 'link',
                    padded: false,
                }" />
        </div>
        <div v-if="isLoading" class="text-center p-4">
            <SharedProductLoader />
        </div>
        <div v-else-if="!products || products.length === 0" class="p-4">
            <UiNoData />
        </div>
        <template v-else>
            <h1 class="text-center text-2xl font-bold">Mahsulotlar ro'yxati</h1>
            <UiProductList class="card-animation" v-for="(product, index) in products" :style="{ '--i': index + 1 }"
                :key="product._id" :product="product" />
        </template>
    </div>
    <ModalsDeleteModal />
    <ModalsEditModal />
</template>

<style scoped>
.card-animation {
    opacity: 0;
    animation: fade-in 500ms forwards;
    animation-delay: calc(0.1s * var(--i));
}

@keyframes fade-in {
    to {
        opacity: 1;
    }
}
</style>
