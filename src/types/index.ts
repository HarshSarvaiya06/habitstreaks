export interface Habit {
  id: string;
  name: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  color: string;
  createdAt: string;
  completionDates: string[]; // ISO date strings
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredDays: number;
  achieved: boolean;
  achievedAt?: string;
}

export type ThemeMode = 'light' | 'dark';