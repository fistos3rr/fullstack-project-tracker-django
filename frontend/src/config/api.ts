export const API_PATHS = {
  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id: number) => `/projects/${id}`,
  },
  COMMENTS: {
    BASE: (project_id: number) => `/projects/${project_id}/comments`,
    BY_ID: (project_id: number, id: number) => `/projects/${project_id}/comments/${id}`,
  },
  LOGS: {
    BASE: (project_id: number) => `/projects/${project_id}/logs`
  }
}
