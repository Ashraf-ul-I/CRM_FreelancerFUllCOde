import { useGetDashboardStatsQuery } from "../features/dashboard/dashboardApi";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

const statusColors: Record<string, string> = {
  Pending: "#FBBF24", 
  Completed: "#22C55E",
  "In Progress": "#3B82F6", 
  Cancelled: "#EF4444", 
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center animate-pulse">
    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
);

const DashboardPage = () => {
  const { data, isLoading, isError } = useGetDashboardStatsQuery();

  const chartData =
    data?.projectsByStatus?.map((s: any) => ({
      name: s.status,
      value: s.count,
    })) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">Dashboard Overview</h1>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : isError ? (
        <div className="text-center text-red-500">Failed to load dashboard data.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-blue-600">{data.totalClients}</span>
              <span className="mt-2 text-lg text-gray-700 dark:text-gray-200">Total Clients</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-green-600">{data.totalProjects}</span>
              <span className="mt-2 text-lg text-gray-700 dark:text-gray-200">Total Projects</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
              <span className="text-4xl font-bold text-yellow-600">{data.remindersDueSoon}</span>
              <span className="mt-2 text-lg text-gray-700 dark:text-gray-200">Reminders Due Soon</span>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center w-full">
              <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Projects by Status</span>
              <div className="w-full h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      label
                    >
                      {chartData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={statusColors[entry.name] || "#8884d8"} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
              Pending Projects
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                {data.pendingProjects.length}
              </span>
            </h2>
            {data.pendingProjects.length === 0 ? (
              <div className="text-gray-400">No pending projects.</div>
            ) : (
              <ul className="list-disc pl-6 space-y-1">
                {data.pendingProjects.map((proj: any) => (
                  <li key={proj.id} className="text-gray-700 dark:text-gray-200">{proj.title}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Projects by Status (Bar Chart)</h2>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value">
                    {chartData.map((entry, idx) => (
                      <Cell key={`bar-cell-${idx}`} fill={statusColors[entry.name] || "#8884d8"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DashboardPage;