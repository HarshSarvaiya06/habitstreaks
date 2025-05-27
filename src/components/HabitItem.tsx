import React, { useState } from 'react';
import { CheckCircle, Circle, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Habit, Category } from '../types';
import { useHabits } from '../context/HabitContext';
import { calculateStreak, getToday, isToday } from '../utils/dateUtils';
import { calculateMonthlyCompletionRate } from '../utils/dateUtils';
import HabitForm from './HabitForm';

interface HabitItemProps {
  habit: Habit;
  category: Category;
}

const HabitItem: React.FC<HabitItemProps> = ({ habit, category }) => {
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  
  const streak = calculateStreak(habit.completionDates);
  const completionRate = calculateMonthlyCompletionRate(habit.completionDates);
  const isCompletedToday = habit.completionDates.includes(getToday());
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      deleteHabit(habit.id);
    }
    setShowMenu(false);
  };
  
  const handleEdit = () => {
    setShowEditForm(true);
    setShowMenu(false);
  };
  
  const handleToggleCompletion = () => {
    toggleHabitCompletion(habit.id);
  };
  
  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border-l-4 hover:shadow-md transition-shadow mb-3"
           style={{ borderLeftColor: habit.color }}>
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <button 
              onClick={handleToggleCompletion}
              className="mt-1 text-gray-400 hover:text-teal-500 dark:text-gray-500 dark:hover:text-teal-400 transition-colors"
            >
              {isCompletedToday ? (
                <CheckCircle className="text-teal-500 dark:text-teal-400\" size={22} />
              ) : (
                <Circle size={22} />
              )}
            </button>
            
            <div>
              <h3 className={`font-medium text-gray-800 dark:text-gray-100 ${isCompletedToday ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                {habit.name}
              </h3>
              
              {habit.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {habit.description}
                </p>
              )}
              
              <div className="flex items-center mt-2 space-x-3">
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: category.color + '20',
                    color: category.color 
                  }}
                >
                  {category.name}
                </span>
                
                <div className="flex items-center">
                  <div className="bg-gray-200 dark:bg-gray-700 w-20 h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${completionRate}%`, 
                        backgroundColor: habit.color 
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {Math.round(completionRate)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {streak}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">days</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={toggleMenu}
                className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <MoreVertical size={18} />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 shadow-lg rounded-md py-1 z-10 w-36 border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleEdit}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showEditForm && (
        <HabitForm 
          initialHabit={habit} 
          onClose={() => setShowEditForm(false)} 
        />
      )}
    </>
  );
};

export default HabitItem;