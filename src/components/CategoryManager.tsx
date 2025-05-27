import React, { useState } from 'react';
import { Plus, X, Edit, Trash2 } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { Category } from '../types';

const CategoryManager: React.FC = () => {
  const { categories, addCategory, deleteCategory } = useHabits();
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState<Omit<Category, 'id'>>({
    name: '',
    color: '#0D9488'
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategory.name) {
      alert('Category name is required');
      return;
    }
    
    addCategory(newCategory);
    setNewCategory({ name: '', color: '#0D9488' });
    setShowForm(false);
  };
  
  const handleDelete = (id: string) => {
    deleteCategory(id);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Categories
        </h2>
        
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300"
        >
          <Plus size={16} className="mr-1" />
          Add Category
        </button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              New Category
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="color"
              name="color"
              value={newCategory.color}
              onChange={handleChange}
              className="h-8 w-8 border border-gray-300 rounded-md"
            />
            
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              placeholder="Category name"
              className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white text-sm"
              required
            />
            
            <button
              type="submit"
              className="px-3 py-1 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Add
            </button>
          </div>
        </form>
      )}
      
      <div className="space-y-2">
        {categories.map(category => (
          <div 
            key={category.id}
            className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            <div className="flex items-center">
              <span 
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              ></span>
              <span className="text-gray-800 dark:text-gray-200">{category.name}</span>
            </div>
            
            <button
              onClick={() => handleDelete(category.id)}
              className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;