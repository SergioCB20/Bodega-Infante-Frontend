import { fetchWithToken } from "../utils/fetchTemplates";

const API_URL = "http://localhost:8081/api/users";

export const getMyUser = () => {
  return fetchWithToken(`${API_URL}/me`);
};
