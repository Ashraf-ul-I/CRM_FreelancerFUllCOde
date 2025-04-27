import { useGetProjectsQuery } from "../features/projects/projectApi";
import { useNavigate } from "react-router-dom";

// Skeleton for loading state
const ProjectSkeleton = () => (
  <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
);

const RemindersSidebar = () => {
  const { data: projects = [], isLoading } = useGetProjectsQuery({});
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Projects</h2>
      {isLoading ? (
        <div>
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
          <ProjectSkeleton />
        </div>
      ) : (
        <ul className="space-y-2">
          {projects.map((project: any) => (
            <li
              key={project.id}
              className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded"
              onClick={() => navigate(`/reminders/${project.id}`)}
            >
              {project.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemindersSidebar;