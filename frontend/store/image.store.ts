import {defineStore} from 'pinia';
import type {IPicture} from "~/interfaces";

export const useImageStore = defineStore('imageStore', {
  state: () => ({
    images: [] as IPicture[],
    isLoading: false,
    selectedImageUrl: null as string | null, // Tanlangan rasm URL sini saqlash
  }),
  actions: {
    setImages(images: IPicture[]) {
      this.images = images;
    },
    addImage(newImage: IPicture) {
      this.images.unshift(newImage); // Yangi rasmni ro'yxatning boshiga qo'shish
    },
    removeImage(imageId: string) {
      this.images = this.images.filter((p: IPicture) => p._id !== imageId);
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
    selectImage(url: string) {
      this.selectedImageUrl = url; // Tanlangan rasm URL sini saqlash
    },
    resetSelectedImage() {
      this.selectedImageUrl = null; // Tanlangan rasm URL sini reset qilish
    }
  },
});
