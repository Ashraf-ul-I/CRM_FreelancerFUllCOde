import { FC } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import Button from './common/Button';
import InfoItem from './common/InfoItem';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteProjectMutation, useGetProjectsQuery } from '../features/projects/projectApi';

interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  deadline: string;
  status: string;
}

const ProjectComponent: FC = () => {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, isError, refetch } = useGetProjectsQuery();
  const [deleteProject, { isLoading: isDeleting, isError: deleteError }] = useDeleteProjectMutation();

  const handleDelete = async (projectId: string) => {
    try {
      await deleteProject(projectId).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to delete project', error);
    }
  };

  if (isLoading || isDeleting) {
    return (
      <div className="max-w-2xl mx-auto mt-10">
        <div className="flex justify-end mb-6">
          <Link to="/add-project">
            <Button
              text="Add Project"
              icon={<Plus size={20} />}
              color="primary"
              size="md"
            />
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 min-h-[200px]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }
  if (isError) return <p className="text-center text-gray-600">Error loading projects.</p>;
  if (deleteError) return <p className="text-center text-gray-600">Error deleting project.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Projects</h2>

      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 min-h-[200px]">
        {projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => {
              const fields = [
                { label: 'Title', value: project.title },
                { label: 'Budget', value: `$${project.budget.toFixed(2)}` },
                { label: 'Deadline', value: new Date(project.deadline).toLocaleDateString() },
                { label: 'Status', value: project.status },
              ];

              return (
                <li
                  key={project.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow transition hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
                    {fields.map((field) => (
                      <InfoItem key={field.label} label={field.label} value={field.value} />
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4 md:mt-0">
                    <Button
                      text="Edit"
                      icon={<Edit size={18} />}
                      color="secondary"
                      size="sm"
                      onClick={() =>
                        navigate(`/add-project/${project.clientId}?edit=1&projectId=${project.id}`, {
                          state: { project },
                        })
                      }
                    />
                    <Button
                      text="Delete"
                      icon={<Trash size={18} />}
                      color="danger"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                      disabled={isDeleting}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-400">No projects found.</div>
        )}
      </div>
    </div>
  );
};

export default ProjectComponent;