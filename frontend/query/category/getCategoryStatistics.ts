import {useQuery} from '@tanstack/vue-query';
import $axios from '~/http';

export const useGetCategoryStatistics = () => {
  return useQuery({
    queryKey: ['get-category-statistics'],
    queryFn: async () => {
      const {data} = await $axios.get('/category/statistics');
      return data;
    },
  });
};
