// Admin Interface
export interface Admin {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
    created_at: string;
    updated_at: string;
    number_modifications: number;
    last_modification_at: string;
    modifications: Modification[];
  }
  
  export interface Modification {
    modification_id: number;
    description: string;
    created_at: string;
    admin: Admin;
  }
  
  // Category Interface
  export interface Category {
    category_id: number;
    name: string;
    description: string;
    products: Product[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  
  // Customer Interface
  export interface Customer {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: "ADMIN" | "CUSTOMER";
    created_at: string;
    updated_at: string;
    phone_number: string;
    number_orders: number;
    orders: Order[];
  }
  
  export interface Order {
    order_id: number;
    status: "SENT" | "ATTENDED" | "CANCELLED";
    totalPrice: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    items: Item[];
  }
  
  export interface Item {
    item_id: number;
    type: "PRODUCT" | "PACKAGE";
    quantity: number;
    product?: Product;
    packageItem?: Package;
  }
  
  export interface Product {
    product_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    available: boolean;
  }
  
  export interface Package {
    package_id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    available: boolean;
  }
  
  // ItemType Enum
  export enum ItemType {
    PRODUCT = "PRODUCT",
    PACKAGE = "PACKAGE",
  }
  
  // OrderStatus Enum
  export enum OrderStatus {
    SENT = "SENT",
    ATTENDED = "ATTENDED",
    CANCELLED = "CANCELLED",
  }
  
  // Role Enum
  export enum Role {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
  }
  
  // PackageProduct Interface
  export interface PackageProduct {
    pxp_id: number;
    package_id: number;
    product_id: number;
    quantity: number;
  }
  
  // User Interface
  export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role;
    created_at: Date;
    updated_at: Date;
  }
  