<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';

const props = defineProps<{ item: any, actionItems: Function }>();
const open = ref(false); // Open state

const computedActionItems = computed(() => props.actionItems(props.item));

const handleScroll = () => {
  if (open.value) {
    open.value = false;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true);
});
</script>

<template>
  <UDropdown v-model:open="open" :items="computedActionItems"
             :popper="{ placement: 'auto', strategy: 'fixed' }">
    <UButton variant="outline" color="cyan" icon="proicons:more-vertical"/>
  </UDropdown>
</template>
