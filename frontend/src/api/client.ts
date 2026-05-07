import axios from "axios";

export const apiClient = axios.create({
  baseURL: `http://${import.meta.env.DOMAIN_NAME}:${import.meta.env.FRONTEND_PORT}/api`,

});
