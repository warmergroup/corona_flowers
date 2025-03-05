// query/useGetImagesQuery.ts
import {useQuery} from '@tanstack/vue-query';
import {useImageStore} from '~/store/image.store';
import $axios from "~/http";


export const useGetImagesQuery = (currentPage: any, itemsPerPage: number, totalItems: any) => {
  const imageStore = useImageStore();

  return useQuery({
    queryKey: ['get-images', currentPage],
    queryFn: async () => {
      const {data} = await $axios.get('images/get', {
        params: {
          page: currentPage.value,
          limit: itemsPerPage,
        },
      });
      imageStore.setImages(data.images);
      totalItems.value = data.totalItems;
      return data;
    },
  });
};
