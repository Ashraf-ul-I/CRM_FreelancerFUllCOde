import { FC } from 'react';
import { Menu, Sun, Moon, X } from 'lucide-react';
import {useLogoutMutation} from "../features/auth/authApi";
import { useDispatch } from 'react-redux';
import { userLoggedOut } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  isSidebarOpen: boolean; 
  setIsSidebarOpen: (value: boolean) => void; 
}

const Navbar: FC<NavbarProps> = ({ isDarkMode, setIsDarkMode, isSidebarOpen, setIsSidebarOpen }) => {
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handeLogout = async () => {
    try {
      await logout({}).unwrap();
      dispatch(userLoggedOut());
      localStorage.removeItem('auth');
      navigate('/login');
      toast.success('Logout successful!');
    } catch (error) {
      toast.error('Logout failed!');
    }
  }
  const handleLogoutClick = () => {     
    handeLogout();
  }

  return (
    <div className="p-4 flex items-center justify-between transition-colors duration-300">
      <h1 className="text-xl font-semibold">CRM Freelancer Dashboard</h1>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-primary text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2 transition-colors duration-300"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button
        onClick={handleLogoutClick}
         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
          Logout
        </button>
        <button
          onClick={handleToggleSidebar}
          className="md:hidden bg-primary text-gray-800 dark:text-white p-2 rounded-md"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
