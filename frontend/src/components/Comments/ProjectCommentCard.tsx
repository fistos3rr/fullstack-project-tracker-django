import { getDateTime } from "../../utils";


export interface ProjectCommentCardProps {
  id: number;
  content: string;
  owner: string;
  created_at: string;
}


export const ProjectCommentCard = ({
  content,
  owner,
  created_at
}: ProjectCommentCardProps) => {
  return (
    <div className="p-4">
      <h1>{content}</h1>
      <div className="mt-2">
        <span className="text-lg text-gray-900">{owner}</span>
      </div>
      <div className="mt-2">
        <span className="text-sm text-gray-600">{getDateTime(created_at)}</span>
      </div>
    </div> 
  );
}; 

export default ProjectCommentCard;
