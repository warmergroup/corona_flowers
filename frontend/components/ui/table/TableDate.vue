<template>
  <small>{{ formattedDate }}</small>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const props = defineProps<{ date: string }>();
const formattedDate = computed(() => dayjs(props.date).format('YYYY-MM-DD HH:mm'));
</script>
