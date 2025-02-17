import type {FormError} from "#ui/types";

const addError = (errors: FormError[], path: string, message: string) => {
  errors.push({path, message});
};

export const validateLogin = (state: { email: string; password: string }): FormError[] => {
  const errors: FormError[] = [];
  if (!state.email) addError(errors, "email", "E-mailni kiriting");
  if (!state.password) addError(errors, "password", "Parolni kiriting");
  return errors;
};

export const validateRegister = (state: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}): FormError[] => {
  const errors: FormError[] = [];
  if (!state.name) addError(errors, "userName", "Ism kerak");
  if (!state.email) addError(errors, "email", "Email kerak");
  if (!state.password) addError(errors, "password", "Parol kerak");
  if (!state.confirmPassword) addError(errors, "confirmPassword", "Parolni tasdiqlash kerak");
  if (state.password !== state.confirmPassword) addError(errors, "confirmPassword", "Parollar mos kelmaydi");
  return errors;
};

export const validateEmail = (state: { email: string }): FormError[] => {
  const errors: FormError[] = [];
  if (!state.email) addError(errors, "email", "E-mailni kiriting");
  return errors;
};

export const validateProduct = (state: {
  title: string;
  description: string;
  price: number;
  size: string;
  stock: number;
  category: string;
  pictureUrl: string;
}): FormError[] => {
  const errors: FormError[] = [];
  if (!state.title) errors.push({path: 'title', message: "Nomi bo'sh bo'lmasligi kerak"});
  if (!state.description) errors.push({path: 'description', message: 'Tavsifi bo\'sh bo\'lmasligi kerak'});
  if (state.price <= 0) errors.push({path: 'price', message: 'Narxi to\'g\'ri bo\'lishi kerak'});
  if (!state.size) errors.push({path: 'size', message: 'O\'lchami bo\'sh bo\'lmasligi kerak'});
  if (state.stock <= 0) errors.push({path: 'stock', message: 'Miqdori to\'g\'ri bo\'lishi kerak'});
  if (!state.category) errors.push({path: 'category', message: 'Kategoriya tanlanishi kerak'});
  if (!state.pictureUrl) errors.push({path: 'pictureUrl', message: 'Rasm tanlanishi kerak'});
  return errors;
};


export const validatePassword = (state: { password: string; confirmPassword: string }): FormError[] => {
  const errors: FormError[] = [];
  if (!state.password) addError(errors, "password", "Password is required");
  if (!state.confirmPassword) addError(errors, "confirmPassword", "Confirm password is required");
  if (state.password !== state.confirmPassword) addError(errors, "confirmPassword", "Passwords do not match");
  return errors;
};

export const validateCategory = (state: { categoryName: string }): FormError[] => {
  const errors: FormError[] = [];
  if (!state.categoryName) addError(errors, 'categoryName', `Kategoriya bo'sh bo'lmasligi kerak`);
  return errors;
};

export const validateImage = (state: { image: File | null }): FormError[] => {
  const errors: FormError[] = [];
  if (!state.image) addError(errors, "image", "Rasm tanlanishi kerak");
  return errors;
};

export const extractErrorMessage = (error: any) => {
  if (error.response?.data?.details?.errors?.length) {
    return error.response.data.details.errors[0].msg;
  } else if (error?.response?.data?.details) {
    return error.response.data.details;
  } else if (error?.response?.data?.message) {
    return error.response.data.message;
  } else {
    return 'Xatolik yuz berdi';
  }
};
