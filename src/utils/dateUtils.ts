/**
 * Date utility functions for the habit tracker
 */

// Format date to YYYY-MM-DD
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Get today's date in YYYY-MM-DD format
export const getToday = (): string => {
  return formatDate(new Date());
};

// Check if a date is today
export const isToday = (dateString: string): boolean => {
  return dateString === getToday();
};

// Calculate streak for a habit
export const calculateStreak = (completionDates: string[]): number => {
  if (completionDates.length === 0) return 0;
  
  const sortedDates = [...completionDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const today = getToday();
  const yesterday = formatDate(new Date(Date.now() - 86400000));
  
  // Check if habit was completed today or yesterday to maintain streak
  const lastCompletionDate = sortedDates[0];
  if (lastCompletionDate !== today && lastCompletionDate !== yesterday) {
    return 0;
  }
  
  let streak = 1;
  let currentDate = lastCompletionDate === today ? yesterday : formatDate(new Date(Date.now() - 2 * 86400000));
  
  for (let i = 1; i < sortedDates.length; i++) {
    if (sortedDates[i] === currentDate) {
      streak++;
      currentDate = formatDate(new Date(new Date(currentDate).getTime() - 86400000));
    } else if (sortedDates[i] < currentDate) {
      break;
    }
  }
  
  return streak;
};

// Calculate completion rate for the current month
export const calculateMonthlyCompletionRate = (completionDates: string[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysPassed = Math.min(now.getDate(), daysInMonth);
  
  const completionsThisMonth = completionDates.filter(date => {
    const dateObj = new Date(date);
    return dateObj.getMonth() === currentMonth && dateObj.getFullYear() === currentYear;
  });
  
  return (completionsThisMonth.length / daysPassed) * 100;
};

// Generate dates for the current month calendar
export const getMonthDates = (): Date[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates: Date[] = [];
  
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day));
  }
  
  return dates;
};

// Check if date is in the future
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
};

// Check if a habit was completed on a specific date
export const isCompletedOnDate = (completionDates: string[], date: Date): boolean => {
  const dateString = formatDate(date);
  return completionDates.includes(dateString);
};