import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import DashBoardPage from './pages/DashBoardPage';
import ClientPage from './pages/ClientPage';
import ProjectPage from './pages/ProjectPage';
import InteractionLogsPage from './pages/InteractionLogsPage';
import ReminderPage from './pages/ReminderPage';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <div className="flex flex-col h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        
        {/* Navbar */}
        <div className="bg-white dark:bg-gray-800 shadow-md">
          <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-1/6 bg-gray-900 dark:bg-gray-800 transition-colors duration-300">
            <SideBar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/clients" element={<ClientPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/interaction-logs" element={<InteractionLogsPage />} />
              <Route path="/reminders" element={<ReminderPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
