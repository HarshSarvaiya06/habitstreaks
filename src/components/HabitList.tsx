import React, { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import HabitItem from './HabitItem';
import HabitForm from './HabitForm';

const HabitList: React.FC = () => {
  const { habits, categories, filterHabits } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  
  const filteredHabits = filterHabits(selectedCategory);
  
  const toggleCategoryFilter = () => {
    setShowCategoryFilter(!showCategoryFilter);
  };
  
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setShowCategoryFilter(false);
  };
  
  const getCategoryById = (categoryId: string) => {
    return categories.find(category => category.id === categoryId) || categories[0];
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">My Habits</h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={toggleCategoryFilter}
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              <Filter size={16} className="mr-2" />
              {selectedCategory ? getCategoryById(selectedCategory).name : 'All Categories'}
            </button>
            
            {showCategoryFilter && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 w-48">
                <div className="py-1">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    All Categories
                  </button>
                  
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      ></span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Add Habit
          </button>
        </div>
      </div>
      
      {filteredHabits.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {selectedCategory 
              ? "No habits in this category. Add one!"
              : "You don't have any habits yet. Add your first habit!"}
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            Add Habit
          </button>
        </div>
      ) : (
        <div>
          {filteredHabits.map(habit => (
            <HabitItem 
              key={habit.id} 
              habit={habit} 
              category={getCategoryById(habit.category)} 
            />
          ))}
        </div>
      )}
      
      {showForm && <HabitForm onClose={() => setShowForm(false)} />}
    </div>
  );
};

export default HabitList;