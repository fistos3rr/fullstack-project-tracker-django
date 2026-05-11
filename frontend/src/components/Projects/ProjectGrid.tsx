import { ProjectCard } from "./ProjectCard";
import type { Project } from "../../api/models/project";
import { Loading } from "../ui/Loading";

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  onProjectClick?: (project: Project) => void;
  columns?: 2 | 3 | 4;
}

export const ProjectGrid = ({
  projects,
  isLoading = false,
  onProjectClick,
  columns = 4,
}: ProjectGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  if (isLoading) {
    return <Loading />
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Projects not found!</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {projects.map((project) => (
        <ProjectCard
          id={project.id}
          name={project.name}
          status={project.status}
          updated_at={project.updated_at}
          onCardClick={() => onProjectClick?.(project)}
        />
      ))} 
    </div>
  )
}
