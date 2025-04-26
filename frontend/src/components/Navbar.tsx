import { Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="p-4 flex items-center justify-between transition-colors duration-300">
      <h1 className="text-xl font-semibold">CRM Freelancer Dashboard</h1>

      <div className="flex items-center gap-4">
        
        <button
          onClick={handleToggle}
          className="bg-primary text-gray-800 dark:text-white px-4 py-2 rounded hover:bg-primary/90 flex items-center gap-2 transition-colors duration-300"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Logout Button */}
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
