import { defineStore } from "pinia";
import type { IProduct } from "~/interfaces";

export const useProductStore = defineStore("productStore", {
  state: () => ({
    products: [] as IProduct[],
    isLoading: false,
  }),
  actions: {
    setProducts(products: IProduct[]) {
      this.products = products;
    },
    addProduct(product: IProduct) {
      this.products.push(product);
    },
    updateProduct(updatedProduct: IProduct) {
      const index = this.products.findIndex(
        (p) => p._id === updatedProduct._id
      );
      if (index !== -1) this.products.splice(index, 1, updatedProduct);
    },
    removeProduct(productId: string) {
      this.products = this.products.filter((p) => p._id !== productId);
    },
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});
