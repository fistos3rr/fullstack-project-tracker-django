import axiosInstance from "../axiosInstance";
import { ProjectComment, ProjectCommentCreate } from "../models/projectComment";
import { PaginatedResponse } from "../models/pagination";


const getCommentsUrl = (projectId: number) => 
  `/projects/${projectId}/comments`;

const getCommentUrl = (
  projectId: number, 
  commentId: number
) => `/projects/${projectId}/comments${commentId}`;


// GET list pagination
export const fetchProjectCommentPage = async (
  projectId: number,
  page = 1,
  pageSize = 10
): Promise<PaginatedResponse<ProjectComment>> => {
  const response = 
    await axiosInstance
      .get<PaginatedResponse<ProjectComment>>(getCommentsUrl(projectId), {
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
    axiosInstance.get<ProjectComment>(getCommentUrl(projectId, commentId));
  return response.data;
};


// POST
export const createProjectComment = async (
  projectId: number, data: ProjectCommentCreate
): Promise<ProjectComment> => {
  const response = await axiosInstance
    .post<ProjectComment>(getCommentsUrl(projectId), data);
  return response.data;
};


// DELETE
export const deleteProjectComment = async (
  projectId: number,
  commentId: number
): Promise<void> => {
  await axiosInstance.delete(getCommentUrl(projectId, commentId));
}
