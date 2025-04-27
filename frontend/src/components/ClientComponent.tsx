import { FC } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import Button from './common/Button';
import InfoItem from './common/InfoItem';
import { Link, useNavigate } from 'react-router-dom';
import {
  useDeleteClientMutation,
} from '../features/client/clientApi';

interface Project {
  clientId: string;
  title: string;
}

interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
  projects?: Project[];
}

interface ClientComponentProps {
  clients: Client[];
  isLoading: boolean;
  isError: boolean;
}

const ClientComponent: FC<ClientComponentProps> = ({ clients, isLoading, isError }) => {
  const navigate = useNavigate();
  const [deleteClient] = useDeleteClientMutation();

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading clients...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-600">Failed to load clients.</p>;
  }

  const handleDeleteClient = async (clientId: string) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await deleteClient(clientId).unwrap();
        // Optionally, show a toast or refetch clients
      } catch (error) {
        alert("Failed to delete client");
      }
    }
  };

  return (
    <div className="w-full mx-auto mt-5">
      <div className="flex justify-end mb-6">
        <Link to="/add-client">
          <Button
            text="Add Client"
            icon={<Plus size={20} />}
            color="primary"
            size="md"
          />
        </Link>
      </div>

      <div className="space-y-4">
        {clients.length > 0 ? (
          clients.map((client) => {
            const fields = [
              { label: 'Name', value: client.name },
              { label: 'Email', value: client.email },
              { label: 'Phone', value: client.phone },
              { label: 'Company', value: client.company || 'null' },
              { label: 'Notes', value: client.notes || 'null' },
              {
                label: 'Project',
                value: Array.isArray(client.projects) && client.projects.length > 0
                  ? client.projects
                      .filter((project) => project.clientId === client.id)
                      .map((project) => project.title)
                      .join(', ')
                  : 'null'
              },
            ];

            return (
              <div
                key={client.id}
                className="bg-gray-100 dark:bg-gray-800 shadow rounded p-4 flex flex-col md:flex-row items-center justify-between h-auto md:h-[120px] transition-transform duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
                  {fields.map((field) => (
                    <InfoItem key={field.label} label={field.label} value={field.value} />
                  ))}
                </div>

                <div className="flex gap-3 mt-4 md:mt-0">
                  {/* Add Project Button */}
                  <Link to={`/add-project/${client.id}`}>
                    <Button
                      text="Add Project"
                      icon={<Plus size={18} />}
                      color="primary"
                      size="sm"
                    />
                  </Link>
                  <Button
                    text="Edit"
                    icon={<Edit size={18} />}
                    color="secondary"
                    size="sm"
                    onClick={() => navigate(`/add-client/${client.id}?edit=1`)}
                  />
                  <Button
                    text="Delete"
                    icon={<Trash size={18} />}
                    color="danger"
                    size="sm"
                    onClick={() => handleDeleteClient(client.id)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No clients found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientComponent;