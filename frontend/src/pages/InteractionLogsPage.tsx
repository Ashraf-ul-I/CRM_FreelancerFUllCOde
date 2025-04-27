import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectsQuery } from "../features/projects/projectApi";
import { motion } from "framer-motion";

const InteractionLogsPage = () => {
  const navigate = useNavigate();
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery({});
  const handleProjectClick = (projectId: string) => {
    navigate(`/logs/${projectId}`); 
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900"
    >
      {isLoading && <p>Loading Projects...</p>}
      {isError && <p className="text-red-500">Failed to load projects</p>}
      <div className="text-center text-gray-600 dark:text-gray-200">
        <h2 className="text-xl font-semibold mb-4">Select a Project</h2>
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
                onClick={() => handleProjectClick(project.id)} // Click to navigate to the project logs
              >
                <h3 className="text-lg font-medium">{project.title}</h3>
              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InteractionLogsPage;
