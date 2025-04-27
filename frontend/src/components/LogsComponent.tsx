import { Plus, MoveLeftIcon } from 'lucide-react';
import Button from './common/Button';
import InfoItem from './common/InfoItem';
import { Link, useParams } from 'react-router-dom';
import { useGetInteractionLogsQuery } from '../features/interatctionLogs/logsApi';

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow animate-pulse mb-4 h-[100px]">
    <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
      <div className="h-5 w-32 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-5 w-40 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-5 w-24 bg-gray-200 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
);

const LogsComponent = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: logs = [], isLoading, isError } = useGetInteractionLogsQuery(projectId);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Interaction Logs</h2>
        <Link to={`/add-logs/${projectId}`}>
          <Button
            text="Add Log"
            icon={<Plus size={20} />}
            color="primary"
            size="md"
          />
        </Link>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 min-h-[200px]">
        {isLoading ? (
          <div>
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">Error loading interaction logs.</div>
        ) : logs.length === 0 ? (
          <div className="text-center text-gray-400">No interaction logs found.</div>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => {
              const fields = [
                { label: 'Date', value: new Date(log.date).toLocaleDateString() },
                { label: 'Interaction Type', value: log.interactionType },
                { label: 'Notes', value: log.notes },
              ];
              return (
                <li
                  key={log.id}
                  className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between shadow transition hover:shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
                    {fields.map((field) => (
                      <InfoItem key={field.label} label={field.label} value={field.value} />
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <Link to={`/interaction-logs`}>
          <Button
            text="Back to Interaction Logs"
            icon={<MoveLeftIcon size={18} />}
            color="secondary"
            size="sm"
          />
        </Link>
      </div>
    </div>
  );
};

export default LogsComponent;