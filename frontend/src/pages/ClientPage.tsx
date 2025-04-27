import { motion } from 'framer-motion';
import ClientComponent from '../components/ClientComponent';
import { useGetClientsQuery } from '../features/client/clientApi';

// Skeleton card for loading state
const ClientSkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col md:flex-row items-center justify-between h-auto md:h-[120px] animate-pulse mb-4">
    <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
    </div>
    <div className="flex gap-3 mt-4 md:mt-0">
      <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  </div>
);

const ClientPage = () => {
  const { data: clients = [], isLoading, isError } = useGetClientsQuery({});

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        ease: 'easeInOut',
      }}
      className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900"
    >
      {isLoading ? (
        <div>
          <ClientSkeletonCard />
          <ClientSkeletonCard />
          <ClientSkeletonCard />
        </div>
      ) : (
        <ClientComponent clients={clients} isLoading={isLoading} isError={isError} />
      )}
    </motion.div>
  );
};

export default ClientPage;