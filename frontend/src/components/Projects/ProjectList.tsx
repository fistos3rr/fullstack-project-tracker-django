import { ProjectGrid } from "../Projects/ProjectGrid"
import { fetchProjectPage } from "../../api/core/projects"
import { useEffect, useState } from "react"
import { Project } from "../../api/models/project"

export interface ProjectListProps {
  page?: number;
}

export const ProjectList = ({
  page = 1,
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchProjectPage(page)
      .then(response => setProjects(response.results))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <ProjectGrid
      isLoading={loading}
      projects={projects}
    />
  )
}
