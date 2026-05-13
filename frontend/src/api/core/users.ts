import { API_PATHS } from "../../config/api";
import apiClient from "../client"
import { UserPublic } from "../models/user"


export const fetchCurrentUser = async (): Promise<UserPublic> => {
  const response = await apiClient.get<UserPublic>(API_PATHS.USERS.ME);
  return response.data;
};
