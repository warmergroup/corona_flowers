import {useQuery} from '@tanstack/vue-query';
import {useProductStore} from '~/store/product.store';
import $axios from "~/http";


export const useGetProductsQuery = () => {
  const productStore = useProductStore();
  return useQuery({
    queryKey: ['get-product'],
    queryFn: async () => {
      const {data} = await $axios.get('product/get');
      productStore.setProducts(data);
      return data;
    },
  });
};
