import React from 'react';
import { Calendar, Sun, Moon, ArrowLeft } from 'lucide-react';
import { useHabits } from '../context/HabitContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useHabits();
  const isTracker = window.location.pathname === '/tracker';
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {isTracker && (
              <a 
                href="/" 
                className="mr-3 p-2 rounded-full hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors" 
                title="Back to Home"
              >
                <ArrowLeft className="h-6 w-6 text-teal-500 dark:text-teal-400" />
              </a>
            )}
            <Calendar className="h-8 w-8 text-teal-500 dark:text-teal-400" />
            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">
              HabitTracker
            </h1>
          </div>
          
          <button
            onClick={toggleTheme}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            ) : (
              <Sun className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;