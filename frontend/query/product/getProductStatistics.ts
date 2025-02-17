import {useQuery} from '@tanstack/vue-query';
import $axios from '~/http';

export const useGetProductStatistics = () => {
  return useQuery({
    queryKey: ['get-product-statistics'],
    queryFn: async () => {
      const {data} = await $axios.get('/product/statistics');
      return data;
    },
  });
};
