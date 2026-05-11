export const ROUTES = {
  PROJECTS: '/projects',
  PROJECT_DETAIL: (id?: number) => id ? `/projects/${id}` : `/projects/:id`,
  NOT_FOUND: '*',
  get HOME() { return this.PROJECTS }, 
} as const;
