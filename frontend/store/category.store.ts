import {defineStore} from 'pinia';
import type {ICategory} from "~/interfaces";

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as ICategory[],
    isLoading: false,
  }),
  actions: {
    setCategories(categories: ICategory[]) {
      this.categories = categories;
    },
    addCategory(newCategory: ICategory) {
      this.categories.unshift(newCategory);
    },
    updateCategory(updatedCategory: ICategory) {
      const index = this.categories.findIndex(
        (p) => p._id === updatedCategory._id
      );
      if (index !== -1) this.categories.splice(index, 1, updatedCategory);
    },
    removeCategory(categoryId: string) {
      this.categories = this.categories.filter((p) => p._id !== categoryId);
    },
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },
  },
});
