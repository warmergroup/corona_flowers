<script lang="ts" setup>
import { useCreateProduct } from '~/hooks/use-create-product';

const createProduct = useCreateProduct()
</script>

<template>
    <div class="flex min-h-[80vh] justify-center items-center">
        <div class="w-1/2 flex justify-center items-center ">
            <NuxtImg class="w-3/4" src="no-data.svg" />
        </div>
        <div class="h-full">
            <p class="text-xl mb-4">Mahsulotlar topilmadi. </p>
            <SharedCreateButton />
        </div>
    </div>
</template>