import { Button } from "../ui/Button";
import { ProjectList } from "../Projects/ProjectList";


export const ProjectPage = () => {
  return (
    <div className='project-page'>
      <Button size='xs' variant='gradient'>New Project</Button>
      <ProjectList />
    </div>
  );
};

export default ProjectPage;
