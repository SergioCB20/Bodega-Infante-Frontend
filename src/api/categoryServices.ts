import { fetchWithToken, fetchWithoutToken } from "../utils/fetchTemplates";
import { CategoryFormData } from "../interfaces/dtos";

const API_URL = "http://localhost:8081/api/categories";

export const getAllCategories = ()=>{
    return fetchWithoutToken(API_URL);
}

export const createCategory = (data: CategoryFormData)=>{
    return fetchWithToken(API_URL,"POST",data);
}

export const updateCategory = (data: CategoryFormData,id:number) => {
    return fetchWithToken(API_URL+'/'+id,"PUT",data);
}

export const deleteCategory = (id:number) => {
    return fetchWithToken(API_URL+'/'+id,"DELETE");
}