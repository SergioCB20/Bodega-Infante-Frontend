import { Modification, Order } from "./bussinessModels";

export interface IregistrationRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
}

export interface IloginRequest {
    email: string;
    password: string;
}

export interface ILogoutRequest {
  setUserInfo: (userInfo: any) => void;
  setRole: (role: string) => void;
}

// AdminInfoDTO Interface
export interface AdminInfoDTO {
    id:number,
    firstName: string;
    lastName: string;
    email: string;
    last_modification_at: Date;
    modifications: Modification[];
  }
  
  // CustomerInfoDTO Interface
  export interface CustomerInfoDTO {
    id:number,
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    orders: Order[];
  }