import { Habit, Category, Badge, ThemeMode } from '../types';

// Local storage keys
const HABITS_KEY = 'habits';
const CATEGORIES_KEY = 'categories';
const BADGES_KEY = 'badges';
const THEME_KEY = 'theme';

// Get habits from local storage
export const getHabits = (): Habit[] => {
  const habits = localStorage.getItem(HABITS_KEY);
  return habits ? JSON.parse(habits) : [];
};

// Save habits to local storage
export const saveHabits = (habits: Habit[]): void => {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
};

// Get categories from local storage
export const getCategories = (): Category[] => {
  const categories = localStorage.getItem(CATEGORIES_KEY);
  if (categories) {
    return JSON.parse(categories);
  }
  
  // Default categories if none exist
  const defaultCategories: Category[] = [
    { id: '1', name: 'Health', color: '#0D9488' },
    { id: '2', name: 'Productivity', color: '#0284C7' },
    { id: '3', name: 'Learning', color: '#6366F1' },
    { id: '4', name: 'Personal', color: '#EC4899' }
  ];
  
  saveCategories(defaultCategories);
  return defaultCategories;
};

// Save categories to local storage
export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

// Get badges from local storage
export const getBadges = (): Badge[] => {
  const badges = localStorage.getItem(BADGES_KEY);
  if (badges) {
    return JSON.parse(badges);
  }
  
  // Default badges if none exist
  const defaultBadges: Badge[] = [
    {
      id: '1',
      name: 'Beginner',
      description: 'Complete a habit for 3 days in a row',
      icon: 'Award',
      requiredDays: 3,
      achieved: false
    },
    {
      id: '2',
      name: 'Consistent',
      description: 'Complete a habit for 7 days in a row',
      icon: 'Medal',
      requiredDays: 7,
      achieved: false
    },
    {
      id: '3',
      name: 'Dedicated',
      description: 'Complete a habit for 14 days in a row',
      icon: 'Trophy',
      requiredDays: 14,
      achieved: false
    },
    {
      id: '4',
      name: 'Champion',
      description: 'Complete a habit for 30 days in a row',
      icon: 'Crown',
      requiredDays: 30,
      achieved: false
    },
    {
      id: '5',
      name: 'Unstoppable',
      description: 'Complete a habit for 60 days in a row',
      icon: 'Zap',
      requiredDays: 60,
      achieved: false
    }
  ];
  
  saveBadges(defaultBadges);
  return defaultBadges;
};

// Save badges to local storage
export const saveBadges = (badges: Badge[]): void => {
  localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
};

// Get theme from local storage
export const getTheme = (): ThemeMode => {
  const theme = localStorage.getItem(THEME_KEY) as ThemeMode;
  return theme || 'light';
};

// Save theme to local storage
export const saveTheme = (theme: ThemeMode): void => {
  localStorage.setItem(THEME_KEY, theme);
};