import { API_PATHS } from "../../config/api"
import apiClient from "../client"
import { AuthResponse, LoginCredentials } from "../models/auth";

/** axios http login request **/
export const loginApi = async (userCredentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    API_PATHS.AUTH.TOKEN,
    userCredentials
  );
  return response.data;
};
