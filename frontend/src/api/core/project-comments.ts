import apiClient from "../client";
import { ProjectComment, ProjectCommentCreate } from "../models/projectComment";
import { PaginatedResponse } from "../models/pagination";
import { API_PATHS } from "../../config/api";


// GET list pagination
export const fetchProjectCommentPage = async (
  projectId: number,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<ProjectComment>> => {
  const response = 
    await apiClient
      .get<PaginatedResponse<ProjectComment>>(API_PATHS.PROJECTS.COMMENTS(projectId).BASE, {
    params: { page, page_size: pageSize },
  });
  return response.data;
};


// GET object
export const fetchProjectComment = async (
  projectId: number,
  commentId: number
): Promise<ProjectComment> => {
  const response = await 
    apiClient.get<ProjectComment>(API_PATHS.PROJECTS.COMMENTS(projectId).BY_ID(commentId));
  return response.data;
};


// POST
export const createProjectComment = async (
  projectId: number, data: ProjectCommentCreate
): Promise<ProjectComment> => {
  const response = await apiClient
    .post<ProjectComment>(`${API_PATHS.PROJECTS.COMMENTS(projectId).BASE}/`, data);
  return response.data;
};


// DELETE
export const deleteProjectComment = async (
  projectId: number,
  commentId: number
): Promise<void> => {
  await apiClient.delete(API_PATHS.PROJECTS.COMMENTS(projectId).BY_ID(commentId));
}
