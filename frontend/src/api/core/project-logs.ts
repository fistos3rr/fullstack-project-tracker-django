import axiosInstance from "../axiosInstance";
import { ProjectLog } from "../models/projectLog";
import { PaginatedResponse } from "../models/pagination";


// GET page
export const fetchProjectLogPage = async (
  projectId: number,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<ProjectLog>> => {
  const response = await
    axiosInstance.get<PaginatedResponse<ProjectLog>>(
      `/projects/${projectId}/logs`,
      { params: { page, page_size: pageSize } });
  return response.data;
};
