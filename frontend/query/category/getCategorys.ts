import {useQuery} from "@tanstack/vue-query";
import $axios from "~/http";

import {useCategoryStore} from "~/store/category.store";

export const useGetCategorysQuery = () => {
  const categoryStore = useCategoryStore();
  return useQuery({
    queryKey: ['get-category'],
    queryFn: async () => {
      categoryStore.setLoading(true);
      const {data} = await $axios.get('category/get');
      categoryStore.setCategories(data);
      categoryStore.setLoading(false)
      return data;
    },
  })
};