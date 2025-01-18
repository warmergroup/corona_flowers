import { defineStore } from "pinia";
import type { IProduct } from "~/interfaces";

export const useConfirm = defineStore("confirmModal", {
  state: () => ({
    isOpen: false,
    modalType: "" as "edit" | "delete" | "",
    product: {} as IProduct,
  }),
  actions: {
    onOpen(type: "edit" | "delete") {
      this.modalType = type;
      this.isOpen = true;
    },
    onClose() {
      this.isOpen = false;
      this.modalType = "";
    },
    setProduct(product: IProduct) {
      this.product = product;
    },
  },
});
