import React from 'react';
import { CalendarDays } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { getMonthDates, isCompletedOnDate, formatDate } from '../utils/dateUtils';

const MonthlyActivity: React.FC = () => {
  const { habits } = useHabits();
  const monthDates = getMonthDates();
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  
  // Get all unique dates where at least one habit was completed
  const allCompletionDates = new Set<string>();
  habits.forEach(habit => {
    habit.completionDates.forEach(date => {
      allCompletionDates.add(date);
    });
  });
  
  // Calculate the percentage of habits completed each day
  const getCompletionPercentage = (date: Date): number => {
    const dateStr = formatDate(date);
    let completedCount = 0;
    
    habits.forEach(habit => {
      if (habit.completionDates.includes(dateStr)) {
        completedCount++;
      }
    });
    
    return habits.length > 0 ? (completedCount / habits.length) * 100 : 0;
  };
  
  const getColorIntensity = (percentage: number): string => {
    if (percentage === 0) return 'bg-gray-100 dark:bg-gray-700';
    if (percentage < 25) return 'bg-teal-100 dark:bg-teal-900';
    if (percentage < 50) return 'bg-teal-200 dark:bg-teal-800';
    if (percentage < 75) return 'bg-teal-300 dark:bg-teal-700';
    return 'bg-teal-500 dark:bg-teal-600';
  };
  
  // Calculate monthly statistics
  const totalDays = monthDates.length;
  const daysWithActivity = monthDates.filter(date => 
    allCompletionDates.has(formatDate(date))
  ).length;
  
  const consistencyRate = totalDays > 0 ? Math.round((daysWithActivity / totalDays) * 100) : 0;
  
  // Calculate the longest streak in the current month
  const getMonthlyStreak = (): number => {
    let currentStreak = 0;
    let maxStreak = 0;
    
    // Sort dates in ascending order
    const sortedDates = [...monthDates].sort((a, b) => a.getTime() - b.getTime());
    
    sortedDates.forEach(date => {
      const hasActivity = allCompletionDates.has(formatDate(date));
      
      if (hasActivity) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });
    
    return maxStreak;
  };
  
  const longestStreak = getMonthlyStreak();
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Monthly Activity
        </h2>
        <div className="flex items-center text-gray-500 dark:text-gray-400">
          <CalendarDays size={18} className="mr-1" />
          <span>{currentMonth} {currentYear}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-6">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
        
        {/* Add empty cells for proper calendar alignment */}
        {Array.from({ length: monthDates[0].getDay() }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8"></div>
        ))}
        
        {monthDates.map(date => {
          const percentage = getCompletionPercentage(date);
          const colorClass = getColorIntensity(percentage);
          const isToday = date.getDate() === new Date().getDate() && 
                         date.getMonth() === new Date().getMonth();
          
          return (
            <div 
              key={date.toISOString()} 
              className={`relative flex items-center justify-center h-8 rounded-md ${colorClass} ${
                isToday ? 'ring-2 ring-teal-500 dark:ring-teal-400' : ''
              }`}
              title={`${date.toLocaleDateString()}: ${Math.round(percentage)}% habits completed`}
            >
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {date.getDate()}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Activity Days</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{daysWithActivity}</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Consistency</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{consistencyRate}%</p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Longest Streak</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">{longestStreak} days</p>
        </div>
      </div>
    </div>
  );
};

export default MonthlyActivity;