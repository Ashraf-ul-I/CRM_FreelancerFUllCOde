import { useParams } from "react-router-dom";
import { useGetRemindersForProjectQuery } from "../features/reminder/reminderApi";
import { useState } from "react";
import ReminderModal from "./ReminderModal";

const ReminderComponents = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { data: reminders = [], isLoading } = useGetRemindersForProjectQuery(projectId!);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Reminders</h2>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
          onClick={() => setShowModal(true)}
        >
          <span className="text-lg font-semibold">+</span>
          <span>Add Reminder</span>
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 min-h-[200px]">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : reminders.length === 0 ? (
          <div className="text-center text-gray-400">No reminders for this project.</div>
        ) : (
          <ul className="space-y-4">
            {reminders.map((reminder: any) => (
              <li
                key={reminder.id}
                className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow transition hover:shadow-md"
              >
                <div>
                  <div className="font-semibold text-lg text-blue-700 dark:text-blue-300">{reminder.message}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Due: <span className="font-medium">{new Date(reminder.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {/* You can add edit/delete buttons here if needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showModal && (
        <ReminderModal
          projectId={projectId!}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ReminderComponents;