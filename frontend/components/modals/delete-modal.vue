<script setup lang="ts">
import { useConfirm } from '~/hooks/use-confirm';
import { useMutation } from '@tanstack/vue-query';
import { useProductStore } from '~/store/product.store';
import $api from '~/http/api';

const confirm = useConfirm();
const productStore = useProductStore();
const toast = useToast();

const isLocalOpen = computed({
    get: () => confirm.isOpen && confirm.modalType === 'delete',
    set: (value) => (confirm.isOpen = value),
});

const extractErrorMessage = (error: any) => {
    if (error.response?.data?.details?.errors?.length) {
        return error.response.data.details.errors[0].msg;
    } else if (error?.response?.data?.message) {
        return error.response.data.message;
    } else {
        return 'Xatolik yuz berdi';
    }
};

const { mutate, error, isPending } = useMutation({
    mutationKey: ['delete-product'],
    mutationFn: async () => {
        if (!confirm.product?._id) {
            throw new Error("Maxsulot mavjud emas!");
        }
        const { data } = await $api.delete(`/product/delete/${confirm.product._id}`);
        return data;
    },
    onSuccess: (data) => {
        productStore.removeProduct(confirm.product._id);
        confirm.onClose();
        toast.add({
            title: "Maxsulot o'chirildi",
            icon: 'bx:icon-deleted',
            color: 'red',
        });
    },
});
</script>

<template>
    <div>
        <UModal title="Aminmisiz" v-model="isLocalOpen">
            <UCard class="p-4 flex flex-col gap-2">
                <div v-if="error">
                    <UAlert :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', padded: false }"
                        icon="material-symbols:brightness-alert-rounded" color="red" variant="outline"
                        :title="extractErrorMessage(error)" />
                </div>
                <div>
                    <h1 class="text-xl font-bold">Ushbu mahsulotni o'chirishga aminmisiz?</h1>
                    <UDivider />
                    <p>Agar uni o'chirsangiz, ma'lumotlar bazasidan butunlay o'chib ketadi.</p>
                </div>
                <template #footer>
                    <div class="w-1/2 grid grid-cols-2 gap-2">
                        <UButton label="Bekor qilish" color="blue" variant="outline" :disabled="isPending"
                            @click="confirm.onClose()" />
                        <UButton label="O'chirish" color="red" @click="mutate()" :loading="isPending" />
                    </div>
                </template>
            </UCard>
        </UModal>
    </div>
</template>
