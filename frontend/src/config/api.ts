export const API_PATHS = {
  PROJECTS: {
    BASE: '/projects/',
    get BY_ID() { return ((id: number) => `${this.BASE}${id}/`) },

    get COMMENTS() {
      return (project_id: number) => {
        const baseComment = `${this.BY_ID(project_id)}comments/`;
        return {
          BASE: baseComment,
          BY_ID: (id: number) => `${baseComment}${id}`,
        }
      }
    },

    get LOGS() {
      return (project_id: number) =>{
        const baseLog = `${this.BY_ID(project_id)}logs/`
        return {
          BASE: baseLog,
        }
      }
    }
  },

  AUTH: {
    BASE: '/auth/',
    get TOKEN() { return "/token/"},
    get TOKEN_REFRESH() { return `${this.TOKEN}refresh/`},
    get LOGIN() { return `${this.BASE}login/` },
    get LOGOUT() { return `${this.BASE}logout/` },
  },

  USERS: {
    BASE: '/users/',
    get ME() { return `${this.BASE}me/` },
  },
}
