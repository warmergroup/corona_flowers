<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";

const props = defineProps({
  onClick: Function,
  label: String,
});

const authStore = useAuthStore();
</script>

<template>
  <UButton v-if="authStore.isAuth" @click="()=> props.onClick" icon="i-heroicons-plus" class="rounded-md"
           color="blue" :label="props.label"/>
</template>
