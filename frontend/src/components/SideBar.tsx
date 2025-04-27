import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, MessageCircle, AlarmClock } from 'lucide-react';

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; 
}

const SideBar: FC<SideBarProps> = ({ isOpen }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/clients', name: 'Clients', icon: <Users className="w-5 h-5" /> },
    { path: '/projects', name: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
    { path: '/interaction-logs', name: 'Interaction Logs', icon: <MessageCircle className="w-5 h-5" /> },
    { path: '/reminders', name: 'Reminders', icon: <AlarmClock className="w-5 h-5" /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-200 dark:bg-gray-800 shadow-md w-full p-4 flex-col transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:h-full`}
    >
      <div className="flex flex-col space-y-6 mt-10">
        <ul className="space-y-4">
          {menuItems.map(({ path, name, icon }) => (
            <li key={name}>
              <Link
                to={path}
                className={`flex items-center gap-3 py-2 px-4 rounded-md transition duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 ${location.pathname === path ? 'bg-gray-300 dark:bg-gray-700' : ''} text-gray-800 dark:text-white`}
              >
                {icon}
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
