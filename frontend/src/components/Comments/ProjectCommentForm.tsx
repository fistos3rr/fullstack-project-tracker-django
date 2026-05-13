import { useForm } from "react-hook-form"
import { ProjectCommentCreate } from "../../api/models/projectComment"
import { createProjectComment, fetchProjectCommentPage } from "../../api/core/project-comments";
import { Button } from "../ui/Button";


export interface ProjectCommentFormProps {
  projectId: number;
  disabled?: boolean;
}

export const ProjectCommentForm = ({
  projectId,
  disabled = false,
}: ProjectCommentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectCommentCreate>({
    defaultValues: {
      content: '',
    },
  });
  const onSubmit = async (data: ProjectCommentCreate) => {
    await createProjectComment(projectId, data);
  }     

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="content">Content *</label>
        <input
          type="text"
          {...register('content', {
            required: 'Comment content required',
          })}
        />
      </div>
      {errors.content && (
        <p style={{ color: 'red', marginTop: 4}}>{errors.content.message}</p>
      )}
      <Button disabled={disabled} onClick={handleSubmit(onSubmit)} size='xs'>Send comment</Button>
    </form>
  );
};
