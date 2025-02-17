// Umumiy interfeyslarni yaratish
export interface IWithTimestamp {
  createdAt: string;
  updatedAt: string;
}

export interface IWithId {
  _id: string;
}

export interface IWithPicture {
  pictureUrl: string;
}

export interface IWithStatus {
  status?: string;
}

// Yangi interfeyslarni umumiy interfeyslardan yaratish
export interface IProduct extends IWithId, IWithTimestamp, IWithPicture, IWithStatus {
  title: string;
  description: string;
  author: {
    _id: string;
    email: string;
    userName: string;
  };
  price: number;
  size: string;
  category: string;
  stock: number;
  discount: number;
  discountedPrice: string | null;
  discountStart: string | null;
  discountEnd: string;
}

export interface IUser extends IWithId {
  userName: string;
  email: string;
  isActivated: boolean;
}

export type AuthType = "register" | "login" | "forgot_password";
export type ModalType =
  "editProduct"
  | "deleteProduct"
  | "createCategory"
  | "editCategory"
  | "deleteCategory"
  | 'createImage'
  | 'deleteImage'
  | 'previewModal'
  | 'imageSlideover';

export interface ICategory extends IWithId, IWithTimestamp {
  categoryName: string;
}

export interface IPicture {
  fileUrl: string,
  _id: string
}

// `Item` interfeysini umumiy interfeyslardan yaratish
export interface Item extends IWithId, IWithTimestamp, IWithPicture, IWithStatus {
  title?: string;
  price?: number;
  size?: string;
  stock?: number;
  category?: string;
  categoryName?: string;

  [key: string]: any;
}

export interface IColumn {
  key: string;
  label: string;
}

export interface IProductState {
  title: string;
  description: string;
  price: number;
  size: string;
  category: string | null;
  stock: number;
  discount: number;
  discountStart: string | null;
  discountEnd: string | null;
  pictureUrl: string;
}