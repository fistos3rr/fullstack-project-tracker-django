import { ProjectStatus } from "./projectStatus";

export interface Project {
  id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  created_at: string,
  updated_at: string,
  owner: string
}

export type ProjectCreate = Omit<Project, "id" | "created_at" | "updated_at" | "owner">;
export type ProjectUpdate = Partial<ProjectCreate>;
