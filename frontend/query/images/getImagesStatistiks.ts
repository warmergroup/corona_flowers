import {useQuery} from '@tanstack/vue-query';
import $axios from "~/http";


export const useGetImageStatistics = () => {
  return useQuery({
    queryKey: ['get-image-statistics'],
    queryFn: async () => {
      const {data} = await $axios.get('/images/statistics');
      return data;
    },
  });
};
