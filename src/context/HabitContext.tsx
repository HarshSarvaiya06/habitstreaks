import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Habit, Category, Badge, ThemeMode } from '../types';
import { getHabits, saveHabits, getCategories, saveCategories, getBadges, saveBadges, getTheme, saveTheme } from '../utils/storageUtils';
import { getToday, formatDate } from '../utils/dateUtils';
import { updateBadges } from '../utils/badgeUtils';

interface HabitContextType {
  habits: Habit[];
  categories: Category[];
  badges: Badge[];
  theme: ThemeMode;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completionDates'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date?: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  toggleTheme: () => void;
  filterHabits: (categoryId: string | null) => Habit[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

interface HabitProviderProps {
  children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [theme, setTheme] = useState<ThemeMode>('light');

  // Load data from local storage on mount
  useEffect(() => {
    setHabits(getHabits());
    setCategories(getCategories());
    setBadges(getBadges());
    setTheme(getTheme());
  }, []);

  // Update badges whenever habits change
  useEffect(() => {
    if (habits.length > 0) {
      const updatedBadges = updateBadges(habits);
      setBadges(updatedBadges);
    }
  }, [habits]);

  // Add a new habit
  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completionDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completionDates: []
    };
    
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  // Update an existing habit
  const updateHabit = (updatedHabit: Habit) => {
    const updatedHabits = habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== id);
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  // Toggle habit completion for a specific date (defaults to today)
  const toggleHabitCompletion = (id: string, date: string = getToday()) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === id) {
        const isCompleted = habit.completionDates.includes(date);
        const updatedCompletionDates = isCompleted
          ? habit.completionDates.filter(d => d !== date)
          : [...habit.completionDates, date];
        
        return {
          ...habit,
          completionDates: updatedCompletionDates
        };
      }
      return habit;
    });
    
    setHabits(updatedHabits);
    saveHabits(updatedHabits);
  };

  // Add a new category
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: uuidv4()
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  // Delete a category
  const deleteCategory = (id: string) => {
    // First check if any habits are using this category
    const habitUsingCategory = habits.some(habit => habit.category === id);
    
    if (habitUsingCategory) {
      alert('Cannot delete category that is in use by habits');
      return;
    }
    
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    saveTheme(newTheme);
  };

  // Filter habits by category
  const filterHabits = (categoryId: string | null): Habit[] => {
    if (!categoryId) return habits;
    return habits.filter(habit => habit.category === categoryId);
  };

  const value = {
    habits,
    categories,
    badges,
    theme,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    addCategory,
    deleteCategory,
    toggleTheme,
    filterHabits
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};