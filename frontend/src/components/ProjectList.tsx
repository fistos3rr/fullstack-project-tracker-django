import React, { useEffect, useState } from 'react';
import { fetchProjectPage } from '../api/core/projects';
import { Project } from '../api/models/project';


export const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadPage = async (page: number) => {
    setLoading(true);
    try {
      const [projectsData] = await Promise.all([
        fetchProjectPage(page, 10),
      ]);
      setProjects(projectsData.results);
      const pageSize = 10;
      setTotalPages(Math.ceil(projectsData.count / pageSize));
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    } 
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  if (loading) return <div> Downloading...</div>;

  return (
    <div>
      <div>
        <ul>
          {projects.map(project => (
            <li key = {project.id}>
              <strong>{project.name}</strong><br />
              Status: {project.status}<br />
              Description: {project.description}<br />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={() => loadPage((currentPage - 1))}>
          Prev
        </button>
        <span>Page {currentPage}/{totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => loadPage(currentPage + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
