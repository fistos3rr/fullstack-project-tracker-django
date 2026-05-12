export const API_PATHS = {
  PROJECTS: {
    BASE: '/projects',
    get BY_ID() { return ((id: number) => `${this.BASE}/${id}`) },
    get POST() { return `${this.BASE}/` }, 

    get COMMENTS() {
      return (project_id: number) => {
        const baseComment = `${this.BY_ID(project_id)}/comments`;
        return {
          BASE: baseComment,
          BY_ID: (id: number) => `${baseComment}/${id}`,
          POST: `${baseComment}/`
        }
      }
    },

    get LOGS() {
      return (project_id: number) =>{
        const baseLog = `${this.BY_ID(project_id)}/logs`
        return {
          BASE: baseLog,
        }
      }
    }
  }
}
