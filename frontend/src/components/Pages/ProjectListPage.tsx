import { Button } from "../ui/Button";
import { ProjectList } from "../Projects/ProjectList";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routes";


export const ProjectListPage = () => {
  const navigate = useNavigate();
  const onClick = async () => {
    navigate(ROUTES.PROJECT_CREATE);
  }

  return (
    <div className='project-page'>
      <Button 
        onClick={onClick} 
        size='xs' 
        variant='gradient' 
        className="mb-4"
      >
        New Project
      </Button>
      <ProjectList />
    </div>
  );
};

export default ProjectListPage;
