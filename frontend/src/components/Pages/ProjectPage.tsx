import { useParams } from "react-router-dom";
import { ProjectDetails } from "../Projects/ProjectDetails";
import { ProjectCommentList } from "../Comments/ProjectCommentList";
import { ProjectLogList } from "../ProjectLogs/ProjectLogList";
import { Button } from "../ui/Button";


export const ProjectPage = () => {
  const { id } = useParams<{ id: string }>(); 

  if (!id) {
    return <div>No project id</div>;
  }

  const projectId = parseInt(id, 10);
  if (isNaN(projectId)) {
    return <div>Invalid project ID</div>;
  }

  return (
    <div className='project'>
      <Button>Change project</Button>
      <ProjectDetails id={projectId} />
      <ProjectCommentList projectId={projectId} />
      <Button>Send message</Button>
      <ProjectLogList projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
