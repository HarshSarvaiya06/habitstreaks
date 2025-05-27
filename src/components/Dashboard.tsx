import React, { useState } from 'react';
import { LayoutGrid, Calendar, Award, Tag } from 'lucide-react';
import HabitList from './HabitList';
import MonthlyActivity from './MonthlyActivity';
import Badges from './Badges';
import CategoryManager from './CategoryManager';

type Tab = 'habits' | 'activity' | 'badges' | 'categories';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('habits');
  
  const tabs = [
    { id: 'habits', label: 'My Habits', icon: <LayoutGrid size={18} /> },
    { id: 'activity', label: 'Activity', icon: <Calendar size={18} /> },
    { id: 'badges', label: 'Badges', icon: <Award size={18} /> },
    { id: 'categories', label: 'Categories', icon: <Tag size={18} /> }
  ];
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-teal-600 dark:text-teal-400 border-b-2 border-teal-500 dark:border-teal-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div>
          {activeTab === 'habits' && <HabitList />}
          {activeTab === 'activity' && <MonthlyActivity />}
          {activeTab === 'badges' && <Badges />}
          {activeTab === 'categories' && <CategoryManager />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;