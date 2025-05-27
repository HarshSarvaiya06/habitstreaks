import { Badge, Habit } from '../types';
import { calculateStreak } from './dateUtils';
import { getBadges, saveBadges } from './storageUtils';

// Check and update badges based on habit streaks
export const updateBadges = (habits: Habit[]): Badge[] => {
  const badges = getBadges();
  let badgesUpdated = false;
  
  // Get the highest streak across all habits
  const maxStreak = Math.max(...habits.map(habit => calculateStreak(habit.completionDates)));
  
  badges.forEach(badge => {
    if (!badge.achieved && maxStreak >= badge.requiredDays) {
      badge.achieved = true;
      badge.achievedAt = new Date().toISOString();
      badgesUpdated = true;
    }
  });
  
  if (badgesUpdated) {
    saveBadges(badges);
  }
  
  return badges;
};

// Get unachieved badges
export const getUnachievedBadges = (): Badge[] => {
  const badges = getBadges();
  return badges.filter(badge => !badge.achieved);
};

// Get achieved badges
export const getAchievedBadges = (): Badge[] => {
  const badges = getBadges();
  return badges.filter(badge => badge.achieved);
};

// Get the next badge to achieve
export const getNextBadge = (maxStreak: number): Badge | null => {
  const unachievedBadges = getUnachievedBadges();
  if (unachievedBadges.length === 0) return null;
  
  // Sort by required days ascending
  const sortedBadges = [...unachievedBadges].sort((a, b) => a.requiredDays - b.requiredDays);
  return sortedBadges[0];
};