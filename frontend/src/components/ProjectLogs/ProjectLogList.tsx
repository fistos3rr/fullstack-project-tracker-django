import { useEffect, useState } from "react";
import { ProjectLog } from "../../api/models/projectLog";
import { fetchProjectLogPage } from "../../api/core/project-logs";
import { Loading } from "../ui/Loading";
import { getDateTime } from "../../utils";

interface ProjectLogListProps {
  projectId: number,
  page?: number,
  pageNumber?: number,
} 

export const ProjectLogList = ({
  projectId,
  page = 1,
  pageNumber = 10,
}: ProjectLogListProps) => {
  

  const [logs, setLogs] = useState<ProjectLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProjectLogPage(projectId, page, pageNumber)
      .then(response => setLogs(response.results))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return <Loading />;
  };

  if (error) {
    return <div>Error: {error}</div>;
  };

  if (logs.length === 0) {
    return (
      <div>
        <p className="text-gray-500">No changes</p>
      </div>
    );
  };


  return (
    <div>
    <ul className="divide-y divide-gray-200 rounded-md border border-gray-200 bg-white">
      {logs.map((log) => (
        <li key={log.id}>
          <h1>old value: {log.old_value}</h1>
          <h1>new value: {log.new_value}</h1>
          <h1>field: {log.field}</h1>
          <h1>changed at: {getDateTime(log.created_at)}</h1>
        </li>
      ))}
    </ul>
    </div>
  );
};
