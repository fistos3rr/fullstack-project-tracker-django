import { useParams } from "react-router-dom";
import { ProjectDetails } from "../Projects/ProjectDetails";
import { ProjectCommentList } from "../Comments/ProjectCommentList";
import { ProjectLogList } from "../ProjectLogs/ProjectLogList";
import { ProjectCommentForm } from "../Comments/ProjectCommentForm";
import { ProjectForm } from "../Projects/ProjectForm";


export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>(); 

  if (!id) {
    return <div>No project id</div>;
  }

  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return <div>Invalid project ID</div>;
  }

  const disabled = !localStorage.getItem("access_token"); 

  return (
    <div className='project'>
      <ProjectForm updateId={projectId} disabled={disabled}/>
      <ProjectDetails id={projectId} />
      <ProjectCommentForm projectId={projectId} disabled={disabled}/>
      <ProjectCommentList projectId={projectId} />
      <ProjectLogList projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
