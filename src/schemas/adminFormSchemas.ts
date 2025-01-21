import { z } from "zod";

export const PackageProductSchema = z.object({
  productName:z.string(),
  productId: z.number().min(1, "El ID del producto no puede estar vacío"),
  quantity: z.number().min(1, "La cantidad debe ser al menos 1"),
});

// Define the main schema for the package
export const PackageSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres").max(255, "El nombre debe tener como máximo 255 caracteres"),
  description: z.string().optional(),
  price: z.number().min(0, "El precio debe ser un número positivo"),
  available: z.boolean(),
  image_url: z.string().optional(),
  products: z.array(PackageProductSchema).min(1, "Se debe agregar al menos un producto"),
});

// Definimos el esquema para el Producto
export const ProductSchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }).max(255, { message: "El nombre no debe exceder los 255 caracteres." }),
  description: z.string().optional(),
  price: z.number().min(0, { message: "El precio debe ser mayor o igual a 0." }),
  image_url: z.string().optional(),
  categoryName: z.string(),
});

// Definimos el esquema para la Categoría
export const CategorySchema = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres." }).max(255, { message: "El nombre no debe exceder los 255 caracteres." }),
  description: z.string().optional(),
});

