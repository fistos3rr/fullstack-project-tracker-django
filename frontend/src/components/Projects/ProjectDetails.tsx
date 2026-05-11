import { useEffect, useState } from "react";
import { Project } from "../../api/models/project";
import { fetchProject } from "../../api/core/projects";
import { getDateTime } from "../../utils";
import { Loading } from "../ui/Loading";

export interface ProjectDetailsProps {
  id: number;
}

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    dot: 'bg-emerald-400',
    ring: 'ring-emerald-500/20'
  },
  COMPLETED: {
    label: 'Completed',
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dot: 'bg-blue-400',
    ring: 'ring-blue-500/20'
  },
  PLANNED: {
    label: 'Planned',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    dot: 'bg-amber-400',
    ring: 'ring-amber-500/20'
  }
}

export const ProjectDetails = ({
  id
}: ProjectDetailsProps) => {
  const [project, setProject] = useState<Project>(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProject(id)
      .then(response => setProject(response ?? null))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]); 

  if (loading) return <Loading />;

  if (!project) return <h1>no project</h1>;

  const status = statusConfig[project?.status];
  const created_at = getDateTime(project?.created_at);
  const updated_at = getDateTime(project?.updated_at);

  if (error) return <div>Error: {error}</div>;


  return (
    <>
    <div className={`bg-white ${status.ring}`}>
      <h1>{project.name}</h1>
      <h1>{project.description}</h1>
      <div className={`${status.color}`}>{status.label}</div>
      <h1>created_at: {created_at}</h1>
      <h1>updated_at: {updated_at}</h1>
    </div> 
    </>
  ); 
};
