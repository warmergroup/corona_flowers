<script setup lang="ts">
import {useGetProductStatistics} from '~/query/product/getProductStatistics';
import {useGetCategoryStatistics} from '~/query/category/getCategoryStatistics';
import {useGetImageStatistics} from '~/query/images/getImagesStatistiks';
import {useGetCategorysQuery} from "~/query/category/getCategorys";

const {} = useGetCategorysQuery()
useHead({title: 'Dashboard | Admin Panel'});

const statistics = ref([
  {
    key: 'products',
    title: 'Mahsulotlar',
    data: useGetProductStatistics(),
    style: '#0f0;',
  },
  {
    key: 'categories',
    title: 'Kategoriyalar',
    data: useGetCategoryStatistics(),
    style: '#f00;',
  },
  {
    key: 'images',
    title: 'Rasmlar',
    data: useGetImageStatistics(),
    style: '#0ff;',
  }
]);
</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-center mb-6">Dashboard</h1>
    <div v-if="statistics.some(stat => stat.data.error)" class="mb-4">
      <SharedAlert :message="extractErrorMessage(statistics.find(stat => stat.data.error)?.data.error)"/>
    </div>
    <div
      class="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 overflow-y-auto">
      <UiStatisticsCard
        v-for="stat in statistics"
        :key="stat.key"
        :title="stat.title"
        :total="stat.data.data?.total"
        :lastThreeDays="stat.data.data?.lastThreeDays"
        :lastTwentyFourHours="stat.data.data?.lastTwentyFourHours"
        :style="stat.style"
      />
      <UiStorageUsage/>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  flex-wrap: wrap;
}
</style>
