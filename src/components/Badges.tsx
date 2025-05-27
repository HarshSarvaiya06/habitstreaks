import React from 'react';
import { Award, Medal, Trophy, Crown, Zap } from 'lucide-react';
import { useHabits } from '../context/HabitContext';
import { Badge } from '../types';
import { calculateStreak } from '../utils/dateUtils';

const BadgeIcons: Record<string, React.ReactNode> = {
  'Award': <Award />,
  'Medal': <Medal />,
  'Trophy': <Trophy />,
  'Crown': <Crown />,
  'Zap': <Zap />
};

const Badges: React.FC = () => {
  const { badges, habits } = useHabits();
  
  // Get max streak across all habits, default to 0 if no habits exist
  const maxStreak = habits.length > 0 ? Math.max(...habits.map(habit => calculateStreak(habit.completionDates))) : 0;
  
  // Sort badges by required days
  const sortedBadges = [...badges].sort((a, b) => a.requiredDays - b.requiredDays);
  
  const getProgressPercentage = (badge: Badge): number => {
    if (badge.achieved) return 100;
    if (maxStreak === 0) return 0;
    return Math.min(100, (maxStreak / badge.requiredDays) * 100);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Achievement Badges
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedBadges.map(badge => {
          const progressPercentage = getProgressPercentage(badge);
          
          return (
            <div 
              key={badge.id} 
              className={`relative p-4 rounded-lg border ${
                badge.achieved 
                  ? 'border-teal-200 bg-teal-50 dark:border-teal-800 dark:bg-teal-900/30' 
                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/30'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  badge.achieved 
                    ? 'bg-teal-100 text-teal-600 dark:bg-teal-800 dark:text-teal-300' 
                    : 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {BadgeIcons[badge.icon]}
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-100">
                    {badge.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {badge.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500 dark:text-gray-400">
                    Progress
                  </span>
                  <span className={badge.achieved ? 'text-teal-600 dark:text-teal-400' : 'text-gray-500 dark:text-gray-400'}>
                    {maxStreak}/{badge.requiredDays} days
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      badge.achieved ? 'bg-teal-500 dark:bg-teal-400' : 'bg-gray-400 dark:bg-gray-500'
                    }`}
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              {badge.achieved && (
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                  <div className="bg-teal-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;