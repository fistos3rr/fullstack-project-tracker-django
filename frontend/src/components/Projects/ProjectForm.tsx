import { useForm } from "react-hook-form"
import { ProjectCreate, ProjectUpdate } from "../../api/models/project"
import { ProjectStatus, ProjectStatusOptions } from "../../api/models/projectStatus"
import { createProject } from "../../api/core/projects";
import { Button } from "../ui/Button";
import { ROUTES } from "../../config/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProject } from "../../api/core/projects";
import { patchProject } from "../../api/core/projects";


export interface ProjectFromProps {
  updateId?: number;
  disabled?: boolean;
}

export const ProjectForm = ({
  updateId = undefined,
  disabled = false,
}: ProjectFromProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectCreate>({
    defaultValues: {
      name: '',
      description: '',
      status: ProjectStatus.PLANNED,
    },
  });
  const navigate = useNavigate();
  const [fetchError, setFetchError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  if (updateId) {
    useEffect(() => {
      fetchProject(updateId)
        .then(response => {
          if (response) {
            console.log(response);
            reset(response);
          }
        })
        .catch(error => {
          console.error(error);
          setFetchError(error);
        });
    }, [updateId]);
  }

  const onSubmit = !updateId ? 
    async (data: ProjectCreate) => {
      const response = await createProject(data)
        .then()
        .catch((error) => {
          console.error(error);
          setSubmitError(error);
        }); 
      if (response) navigate(ROUTES.PROJECT_DETAIL(response.id))
    }
  :
    async (data: ProjectUpdate) => {
      await patchProject(updateId, data)
        .then()
        .catch(error => { 
          console.error(error); 
          setSubmitError(error);
        });
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
        {fetchError && (<p style={{ color: 'red', marginTop: 8 }}>Something went wrong while fetching data!</p>)}
        {submitError && (<p style={{ color: 'red', marginTop: 8 }}>Something went wrong while submitting data!</p>)}
      </div>
      <Button disabled={disabled} onClick={handleSubmit(onSubmit)}>
        {!updateId ? "Create project" : "Update project"}
      </Button>
    </form>
  );
};
