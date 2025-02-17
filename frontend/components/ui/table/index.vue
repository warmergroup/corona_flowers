<script setup lang="ts">
import TablePicture from './TablePicture.vue';
import TableDate from './TableDate.vue';
import TableStatus from './TableStatus.vue';
import TableActions from './TableActions.vue';
import type {Item, IColumn} from '~/interfaces';

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<IColumn[]>,
    required: true,
  },
  searchKey: {
    type: String,
    required: true,
  },
  actionItems: {
    type: Function as PropType<(item: Item) => any[]>,
    required: true,
  },
  isLoading: {
    type: Boolean,
  },
  tableTitle: String
});

const search = ref('');
const currentPage = ref(1);
const pageSize = ref(10);
const filteredItems = computed(() => {
  let items = [...props.items];
  if (search.value && props.searchKey) {
    items = items.filter(item =>
      (item[props.searchKey] ?? '').toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return items;
});

// Sahifalangan elementlarni hisoblash
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredItems.value.slice(start, end);
});

// Jami sahifalarni hisoblash
const totalPages = computed(() => Math.ceil(props.items.length / pageSize.value));

// Sahifani o'zgartirish funksiyasi
const changePage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Komponent turi aniqlovchi funksiya
function getComponent(key: string) {
  switch (key) {
    case 'picture':
      return TablePicture;
    case 'createdAt':
    case 'updatedAt':
      return TableDate;
    case 'status':
      return TableStatus;
    case 'actions':
      return TableActions;
    case 'categoryName': // Yangi kategoriya nomi komponenti
      return 'span'; // To'g'ridan-to'g'ri tekst ko'rsatish
    default:
      return 'span';
  }
}

</script>

<template>
  <div class="h-full">
    <div class="block space-y-2 sm:flex justify-between items-center mb-4 p-1 ">
      <UInput
        v-model="search"
        type="text"
        placeholder="Search"
        color="blue"
        size="sm"
      />
      <slot name="create-button"/>
    </div>
    <div class="overflow-y-auto h-[65vh]">
      <table class="w-full border-collapse border dark:border-gray-700 border-gray-200">
        <thead class="sticky top-0 z-10 dark:bg-gray-700 bg-gray-100">
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            class="text-left border-r dark:border-gray-700 border-gray-200 px-3 py-2"
          >
            {{ column.label }}
          </th>
        </tr>
        </thead>
        <tbody class="w-full">
        <SharedLoader v-if="isLoading"/>
        <UiNoData :title="tableTitle" v-if="items.length === 0"/>
        <tr v-else
            v-for="(item, index) in paginatedItems"
            :key="item._id"
            :style="{ '--i': index }"
            class="card-animation dark:hover:bg-gray-700 hover:bg-gray-50 hover:-z-50 hover:bg-transparent"
        >
          <td
            v-for="column in columns"
            :key="column.key"
            class="border-r dark:border-gray-700 border-gray-200 p-2"
          >
            <component
              :is="getComponent(column.key)"
              :item="item"
              :column="column"
              :action-items="props.actionItems"
              :date="item[column.key]"
              :status="item.status"
              :url="item.pictureUrl"
              :title="item.title"
              :price="item.price"
              :size="item.size"
              :stock="item.stock"
              :category="item.category"
              :category-name="item.category?.categoryName ?? 'No Category'"
            >
              {{ column.key === 'category' ? (item.category?.categoryName ?? 'No Category') : item[column.key] }}
            </component>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination controls -->
    <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
      <UPagination
        :active-button="{ color:'blue' }"
        :ui="{ rounded: 'first-of-type:rounded-s-md last-of-type:rounded-e-md' }"
        v-model="currentPage"
        :max="5"
        :total="filteredItems.length"
        sibling-count="1"
        :first-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'First', color: 'gray' }"
        :last-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Last', color: 'gray' }"
      />
    </div>
  </div>
</template>


<style scoped>
.card-animation {
  opacity: 0;
  animation: fade-in 600ms forwards;
  animation-delay: calc(0.1s * var(--i));
}

.card-animation:nth-of-type(even) {
  --i: 1;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}
</style>
