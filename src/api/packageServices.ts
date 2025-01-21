import { fetchWithToken, fetchWithoutToken } from "../utils/fetchTemplates";

const API_URL = "http://localhost:8081/api/packages";

export const getAllPackages = () => {
  return fetchWithoutToken(API_URL);
};

export const createPackage = (data: any, image: File | null) => {
  const formData = new FormData();

  // Serializa los datos del paquete como JSON y los envía en el campo "data"
  formData.append(
    "data",
    JSON.stringify({
      name: data.name,
      description: data.description,
      price: data.price,
      available: data.available,
      products: data.products,
    })
  );

  // Adjunta la imagen si está presente
  if (image) {
    formData.append("image", image);
  }

  // Envía el FormData al backend usando fetchWithToken
  return fetchWithToken(API_URL, "POST", formData);
};

export const updatePackage = async (
  data: any,
  image: File | null,
  id: number
) => {
  return fetchWithToken(API_URL, "PUT");
};

export const deletePackage = (id:number)=>{
  return fetchWithToken(API_URL+'/'+id,'DELETE');
}
