import { useForm } from "react-hook-form"
import { ProjectCommentCreate } from "../../api/models/projectComment"
import { createProjectComment } from "../../api/core/project-comments";
import { Button } from "../ui/Button";
import { useState } from "react";


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
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (data: ProjectCommentCreate) => {
    await createProjectComment(projectId, data)
      .then()
      .catch(error => {
        console.error(error);
        setSubmitError(error);
      });
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
        <p style={{ color: 'red', marginTop: 4 }}>{errors.content.message}</p>
      )}
      {submitError && (
        <p style={{ color:'red', marginTop: 4 }}>Something went wrong while submitting comment.</p>
      )}
      <Button disabled={disabled} onClick={handleSubmit(onSubmit)} size='xs'>Send comment</Button>
    </form>
  );
};
