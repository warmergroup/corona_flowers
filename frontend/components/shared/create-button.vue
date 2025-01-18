<script setup lang="ts">
import { useCreateProduct } from '~/hooks/use-create-product';
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();
const createProduct = useCreateProduct();
</script>

<template>
    <UButton v-if="authStore.isAuth" class="rounded-md font-bold text-sm sm:text-base md:text-lg" size="lg"
        variant="outline" color="blue" @click="createProduct.onOpen">
        <span>
            Mahsulot qo'shish
            <Icon size="xl" name="material-symbols:add-circle-outline-rounded" />
        </span>
    </UButton>
</template>
