import { ProductFormData } from "../interfaces/dtos";
import { fetchWithToken, fetchWithoutToken } from "../utils/fetchTemplates";

const API_URL = "http://localhost:8081/api/products";

export const getAllProducts = () => {
    return fetchWithoutToken(API_URL);
}

export const createProduct = async (data: ProductFormData, image: File | null) => {
    const formData = new FormData();
  
    // Agregar los datos del producto al FormData
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('categoryName', data.categoryName);
  
    // Si hay imagen, agregarla al FormData
    if (image) {
      formData.append('image', image);
    }

    formData.forEach((value,key)=>{
        console.log(key + ": " + value)
    })
  
    // Llamar al backend con el FormData
    return fetchWithToken(API_URL, 'POST', formData);
  };
  
  

export const updateProduct =  (id:number,data: ProductFormData, image: File | null) => {
    const formData = new FormData();
  
    // Agregar los datos del producto al FormData
    formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('categoryName', data.categoryName);
  
    // Si hay imagen, agregarla al FormData
    if (image) {
      formData.append('image', image);
    }
  
    // Llamar al backend con el FormData
    return fetchWithToken(API_URL+'/'+id, 'PUT', formData);
}

export const deleteProduct = (id: number) => {
    return fetchWithToken(API_URL+'/'+id,'DELETE');
}

export const searchProductsByName = (text:string) =>{
  return fetchWithoutToken(API_URL+"/filter?text="+text);
}