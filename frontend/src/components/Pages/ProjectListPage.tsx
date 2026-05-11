import { Button } from "../ui/Button";
import { ProjectList } from "../Projects/ProjectList";


export const ProjectListPage = () => {
  return (
    <div className='project-page'>
      <Button size='xs' variant='gradient' className="mb-4">New Project</Button>
      <ProjectList />
    </div>
  );
};

export default ProjectListPage;
