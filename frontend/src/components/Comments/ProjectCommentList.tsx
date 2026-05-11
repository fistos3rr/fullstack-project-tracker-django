import { useEffect, useState } from "react";
import { ProjectComment } from "../../api/models/projectComment";
import { Loading } from "../ui/Loading";
import ProjectCommentCard from "./ProjectCommentCard";
import { fetchProjectCommentPage } from "../../api/core/project-comments";


interface ProjectCommentListProps {
  projectId: number,
  page?: number,
  pageNumber?: number,
}

export const ProjectCommentList = ({
  projectId,
  page = 1,
  pageNumber = 10
}: ProjectCommentListProps) => {
  const [comments, setComments] = useState<ProjectComment[]>([]) 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProjectCommentPage(projectId, page, pageNumber)
      .then(response => setComments(response.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return <Loading />;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (comments.length === 0) {
    return (
      <div>
        <p className="text-gray-500">No comments</p>
      </div>
    );
  };

  return (
    <div>
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
      {comments.map((comment) => (
        <li key={comment.id}>
          <ProjectCommentCard
            id={comment.id}
            content={comment.content}
            owner={comment.owner}
            created_at={comment.created_at}
          />
        </li>
      ))}
    </ul>
    </div>
  );
};
