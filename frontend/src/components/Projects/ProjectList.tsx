import { ProjectGrid } from "../Projects/ProjectGrid"
import { fetchProjectPage } from "../../api/core/projects"
import { useEffect, useState } from "react"
import { Project } from "../../api/models/project"

export interface ProjectListProps {
  page?: number;
  pageNumber?: number;
}

export const ProjectList = ({
  page = 1,
  pageNumber = 10,
}: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProjectPage(page, pageNumber)
      .then(response => setProjects(response.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (error) return <div>Error: {error}</div>
  return (
    <ProjectGrid
      isLoading={loading}
      projects={projects}
    />
  )
}
