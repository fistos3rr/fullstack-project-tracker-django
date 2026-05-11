import apiClient from "../client";
import { ProjectLog } from "../models/projectLog";
import { PaginatedResponse } from "../models/pagination";
import { API_PATHS } from "../../config/api";


// GET page
export const fetchProjectLogPage = async (
  projectId: number,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<ProjectLog>> => {
  const response = await
    apiClient.get<PaginatedResponse<ProjectLog>>(
      API_PATHS.LOGS.BASE(projectId),
      { params: { page, page_size: pageSize } });
  return response.data;
};
