import React, { useEffect } from 'react';
import { HabitProvider, useHabits } from './context/HabitContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

// Theme wrapper component
const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useHabits();
  
  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 ${theme}`}>
      {children}
    </div>
  );
};

// Main app component
const AppContent: React.FC = () => {
  return (
    <ThemeWrapper>
      <Header />
      <Dashboard />
    </ThemeWrapper>
  );
};

// Root component with context provider
function App() {
  return (
    <HabitProvider>
      <AppContent />
    </HabitProvider>
  );
}

export default App;