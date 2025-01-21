import { Modification, Order } from "./bussinessModels";
import {z} from "zod";
import { ProductSchema, PackageSchema, CategorySchema, PackageProductSchema } from "../schemas/adminFormSchemas";

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

  // ItemType Enum
export enum ItemType {
  PRODUCT = 'Product',
  PACKAGE = 'Package',
}

// ItemDTO Interface
export interface ItemDTO {
  itemType: ItemType;
  productId: number | null; // Puede ser nulo si es un paquete
  packageId: number | null; // Puede ser nulo si es un producto
  quantity: number;
}

// OrderDTO Interface
export interface OrderDTO {
  items: ItemDTO[];
  phoneNumber: string;
}

export type CategoryFormData  = z.infer<typeof CategorySchema>;
export type ProductFormData  = z.infer<typeof ProductSchema>;
export type PackageFormData  = z.infer<typeof PackageSchema>;
export type PackageProductFormData = z.infer<typeof PackageProductSchema>
export type CustomerFormData = {
    id:number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    orders: Order[],
}

export type AdminTableData = CategoryFormData | ProductFormData | PackageFormData | CustomerFormData;