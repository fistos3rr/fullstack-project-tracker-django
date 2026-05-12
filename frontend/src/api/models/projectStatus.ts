export enum ProjectStatus {
  ACTIVE = "ACTIVE",
  PLANNED = "PLANNED",
  COMPLETED = "COMPLETED",
};

export const ProjectStatusOptions = Object.entries(ProjectStatus)
  .map(([label, value]) => ({ value: value as ProjectStatus, label }));
