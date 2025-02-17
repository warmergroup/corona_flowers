import {defineStore} from "pinia";
import type {IProduct, ICategory, ModalType, IPicture} from "~/interfaces";

export const useConfirm = defineStore("confirmModal", {
  state: () => ({
    isOpen: false,
    modalType: "" as ModalType | "",
    product: {} as IProduct,
    category: {} as ICategory,
    image: {} as IPicture,
    imageSlideover: {} as IPicture,
    previewImageUrl: "" as string,
  }),
  actions: {
    onOpen(type: ModalType) {
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
    setCategory(category: ICategory) {
      this.category = category;
    },
    setImage(image: IPicture) {
      this.image = image
    },
    setPreviewImageUrl(url: string) {
      this.previewImageUrl = url;
    },
  },
});
