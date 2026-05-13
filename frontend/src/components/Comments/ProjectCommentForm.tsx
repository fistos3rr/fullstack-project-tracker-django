import { useForm } from "react-hook-form"
import { ProjectCommentCreate } from "../../api/models/projectComment"
import { createProjectComment, fetchProjectCommentPage } from "../../api/core/project-comments";
import { Button } from "../ui/Button";
import { useState } from "react";


export interface ProjectCommentFormProps {
  projectId: number;
}

export const ProjectCommentForm = ({
  projectId
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
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = async (data: ProjectCommentCreate) => {
    await createProjectComment(projectId, data);
  }     

  if (!localStorage.getItem("access_token")) {
    setDisabled(true);
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
