export interface IProduct {
  _id: string;
  title: string;
  description: string;
  picture: {
    url: string;
  };
  createdAt: string;
  author: {
    _id: string;
    userName: string;
    email: string;  
  };
}

export interface IUser {
  userName: string;
  email: string;
  isActivated: boolean;
  id: string;
}

export type AuthType = "register" | "login" | "forgot_password";
