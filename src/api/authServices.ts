import {
  IregistrationRequest,
  IloginRequest,
  ILogoutRequest,
} from "../interfaces/dtos";
import { fetchWithoutToken } from "../utils/fetchTemplates";

const API_URL = "http://localhost:8081/api/auth";

export const register = async (data: IregistrationRequest) => {
  return fetchWithoutToken(`${API_URL}/register`, "POST", data);
};

export const login = async (data: IloginRequest) => {
  return fetchWithoutToken(`${API_URL}/login`, "POST", data);
};

export const logout = (data: ILogoutRequest) => {
  localStorage.removeItem("token");
  console.log("Logged out");
  data.setUserInfo(null);
};
