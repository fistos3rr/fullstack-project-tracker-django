import axiosInstance from "../axiosInstance";
import { Project, ProjectCreate, ProjectUpdate } from '../models/project';
import { PaginatedResponse } from "../models/pagination";


// GET list with pagination
export const fetchProjectPage = async (page = 1, pageSize = 10): Promise<PaginatedResponse<Project>> => {
  const response = await axiosInstance.get<PaginatedResponse<Project>>("/projects", {
    params: { page, page_size: pageSize },
  });
  return response.data;
};


// GET one project
export const fetchProject = async (id: number): Promise<Project> => {
  const response = await axiosInstance.get<Project>(`/projects/${id}`);
  return response.data;
};


// POST
export const createProject = async (projectData: ProjectCreate): Promise<Project> => {
  const response = await axiosInstance.post<Project>("/projects", projectData);
  return response.data;
};


// PATCH
export const patchProject = async (id: number, updates: ProjectUpdate): Promise<Project> => {
  const response = await axiosInstance.patch<Project>(`/projects/${id}`, updates);
  return response.data;
};


// DELETE
export const deleteProject = async (
  id: number
): Promise<void> => {
  await axiosInstance.delete(`/projects/${id}`);
};
