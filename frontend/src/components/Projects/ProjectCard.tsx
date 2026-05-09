import { ProjectStatus } from "../../api/models/projectStatus";


export interface ProjectCardProps {
  id: number;
  name: string;
  status: ProjectStatus;
  updated_at: string;
  onCardClick?: () => void;
}


export const ProjectCard = ({
  name,
  status,
  updated_at,
  onCardClick,
}: ProjectCardProps) => {
  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      onClick={onCardClick} 
    >
      <div className="p-4">
        <h3 className="font-medium text-gray-900 line-clamp-1">{name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm text-gray-600">{status}</span>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold text-gray-900">{updated_at}</span>
        </div>
      </div>
    </div>
  )
};
