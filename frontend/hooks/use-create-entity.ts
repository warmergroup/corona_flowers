import {defineStore} from "pinia";

export const useCreateEntity = defineStore("createEntity", {
  state: () => ({
    isOpen: false,
    entityType: "" as "product" | "category" | "",
  }),
  actions: {
    onOpen(type: "product" | "category") {
      this.entityType = type;
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
      this.entityType = "";
    },
  },
});
