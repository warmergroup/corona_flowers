import {defineStore} from "pinia";

export const useCreateCategory = defineStore("createCategory", {
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
