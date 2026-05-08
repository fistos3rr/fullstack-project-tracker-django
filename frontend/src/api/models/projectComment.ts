export interface ProjectComment {
  id: number;
  content: string;
  created_at: string;
  project: number;
  owner: string;
}

export type ProjectCommentCreate = Omit<ProjectComment, "id" | "created_at" | "project" | "owner">
