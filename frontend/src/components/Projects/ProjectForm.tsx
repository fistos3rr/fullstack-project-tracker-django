import { SubmitHandler, useForm } from "react-hook-form"
import { ProjectCreate } from "../../api/models/project"
import { ProjectStatus, ProjectStatusOptions } from "../../api/models/projectStatus"
import { createProject } from "../../api/core/projects";
import { Button } from "../ui/Button";


export const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectCreate>({
    defaultValues: {
      name: '',
      description: '',
      status: ProjectStatus.PLANNED,
    },
  });

  const onSubmit: SubmitHandler<ProjectCreate> = (data) => {
    createProject(data)
      .then()
      .catch(error => console.log(error))
      .finally();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          {...register('name', {
            required: 'Name required',
          })}
        />
      </div>
      {errors.name && (
        <p style={{ color: 'red', marginTop: 4 }}>{errors.name.message}</p>
      )}
      <div>
        <label htmlFor="description">Description *</label>
        <input
          type="text"
          {...register('description', {
            required: 'Description required'
          })}
        />
      </div>
      {errors.description && (
        <p style={{ color: 'red', marginTop: 4 }}>{errors.description.message}</p>
      )}
      <div>
        <label htmlFor="status">Project status *</label>
        <select
          id="status"
          {...register('status', { required: 'Choose status' })}
        >
          {ProjectStatusOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {errors.status && (
          <p style={{ color: 'red', marginTop: 4 }}>{errors.status.message}</p>
        )}
      </div>
      <Button onClick={handleSubmit(onSubmit)}>Create project</Button>
    </form>
  );
};
