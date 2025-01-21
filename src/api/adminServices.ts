import { fetchWithToken } from "../utils/fetchTemplates";

const API_URL = "http://localhost:8081/api/admin";

export const getAllCostumers = () => {
    return fetchWithToken(`${API_URL}/customers`);
}