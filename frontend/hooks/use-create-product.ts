import { defineStore } from "pinia";

export const useCreateProduct = defineStore("createProduct", {
  state: () => ({
    isOpen: false,
  }),
  actions: {
    onOpen() {
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
    },
  },
});
