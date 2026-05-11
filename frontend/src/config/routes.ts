export const ROUTES = {
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id?: number) => id ? `/projects/${id}` : `/projects/:id`,
  NOT_FOUND: '*',
  get HOME() { return this.PROJECTS }, 
  COMMENTS: (project_id?: number) => project_id ? `/projects/${project_id}` : `/projects/:id`
} as const;
