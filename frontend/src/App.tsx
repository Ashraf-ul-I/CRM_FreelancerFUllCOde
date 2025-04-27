import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import DashBoardPage from './pages/DashBoardPage';
import ClientPage from './pages/ClientPage';
import ProjectPage from './pages/ProjectPage';
import Login from './pages/LoginPage';
import Register from './pages/Register';
import useAuthCheck from './hooks/useAuthCheck';
import useAuth from './hooks/useAuth';
import { useEffect, useState } from 'react';
import AddClientForm from './components/AddClientFrom';
import AddProjectForm from './components/AddProjectFrome';
import InteractionLogsPage from './pages/InteractionLogsPage';
import LogsComponent from './components/LogsComponent';
import AddLogsComponents from './components/AddLogsComponent';
import RemindersSidebar from './components/ReminderSidebar';
import ReminderComponents from './components/RemindersComponents';
import { useGetRemindersThisWeekQuery } from "./features/reminder/reminderApi";
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const authChecked = useAuthCheck();
  const isLoggedIn = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const [showDueModal, setShowDueModal] = useState(false);
  const { data: reminders = [], isLoading: remindersLoading } = useGetRemindersThisWeekQuery(undefined, { skip: !isLoggedIn });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isLoggedIn && reminders.length > 0) {
      setShowDueModal(true);
    }
  }, [isLoggedIn, reminders.length]);

  if (!authChecked) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn && (
        <div className="fixed top-0 left-0 w-full z-20 bg-white text-gray-500 dark:text-gray-100 dark:bg-gray-800 p-1 shadow-md">
          <Navbar
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      )}

      <div className="flex">
        {isLoggedIn && (
          <div className="fixed top-14 left-0 w-1/6 h-[calc(100vh-56px)] bg-white dark:bg-gray-800 shadow-md z-10">
            <SideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          </div>
        )}

        <div className={`flex-1 ml-0 ${isLoggedIn ? "md:ml-[16.6667%]" : ""} pt-16 h-screen overflow-y-auto scrollbar-hide`}>
          
          <Modal
            isOpen={showDueModal}
            onRequestClose={() => setShowDueModal(false)}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
              },
              content: {
                top: '10%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, 0)',
                width: '400px',
                padding: '20px',
                borderRadius: '10px',
                background: 'white',
              },
            }}
          >
            <h2 className="text-xl font-bold mb-4">Reminders Due Soon</h2>
            <ul className="mb-4 space-y-2">
              {reminders.map((reminder: any) => (
                <li key={reminder.id} className="border-b pb-2">
                  <div className="font-semibold">{reminder.project?.title || "Project"}</div>
                  <div className="text-gray-500 text-sm">
                    (Due: {new Date(reminder.dueDate).toLocaleDateString()})
                  </div>
                  <div className="text-gray-700">{reminder.message}</div>
                </li>
              ))}
            </ul>
            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowDueModal(false)}
              >
                Close
              </button>
            </div>
          </Modal>

          <Routes>
            {!isLoggedIn ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<DashBoardPage />} />
                <Route path="/clients" element={<ClientPage />} />
                <Route path="/add-client" element={<AddClientForm />} />
                <Route path="/add-client/:clientId" element={<AddClientForm />} />
                <Route path="/add-project/:clientId" element={<AddProjectForm />} />
                <Route path="/projects" element={<ProjectPage />} />
                <Route path="/interaction-logs" element={<InteractionLogsPage />} />
                <Route path="/logs/:projectId" element={<LogsComponent />} />
                <Route path="/add-logs/:projectId" element={<AddLogsComponents />} />
                <Route path="/reminders" element={<RemindersSidebar />} />
                <Route path="/reminders/:projectId" element={<ReminderComponents />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
