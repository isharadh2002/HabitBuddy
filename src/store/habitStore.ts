// src/store/habitStore.ts
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  priority: 1 | 2 | 3 | 4 | 5; // 1: Highest, 5: Lowest
  createdAt: Date;
  completedDates: string[]; // Array of date strings (YYYY-MM-DD)
  userEmail: string; // Add user email to associate habit with user
}

interface HabitState {
  habits: Habit[];
  addHabit: (
    name: string,
    frequency: 'daily' | 'weekly',
    priority: 1 | 2 | 3 | 4 | 5,
    userEmail: string,
  ) => void;
  editHabit: (
    habitId: string,
    name: string,
    frequency: 'daily' | 'weekly',
    priority: 1 | 2 | 3 | 4 | 5,
    userEmail: string,
  ) => void;
  removeHabit: (habitId: string, userEmail: string) => void;
  toggleHabitCompletion: (
    habitId: string,
    date: string,
    userEmail: string,
  ) => void;
  isHabitCompletedToday: (habitId: string, userEmail: string) => boolean;
  getTodaysProgress: (userEmail: string) => number;
  getWeeklyProgress: (
    userEmail: string,
  ) => {day: string; completed: number; total: number}[];
  getHabitsByFilter: (
    filter: 'all' | 'today' | 'completed',
    userEmail: string,
  ) => Habit[];
  getUserHabits: (userEmail: string) => Habit[];
  getHabitById: (habitId: string, userEmail: string) => Habit | undefined;
}

const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

const getWeekDates = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const getDayName = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {weekday: 'short'});
};

// Helper function to sort habits by priority
const sortHabitsByPriority = (habits: Habit[]) => {
  return habits.sort((a, b) => {
    // Sort by priority first (1 = highest priority comes first)
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    // If same priority, sort by creation date (newer first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],

      addHabit: (name, frequency, priority, userEmail) => {
        const newHabit: Habit = {
          id: Date.now().toString(),
          name,
          frequency,
          priority,
          createdAt: new Date(),
          completedDates: [],
          userEmail, // Associate habit with user
        };
        set(state => ({habits: [...state.habits, newHabit]}));
      },

      editHabit: (habitId, name, frequency, priority, userEmail) => {
        set(state => ({
          habits: state.habits.map(habit => {
            if (habit.id === habitId && habit.userEmail === userEmail) {
              return {
                ...habit,
                name,
                frequency,
                priority,
              };
            }
            return habit;
          }),
        }));
      },

      removeHabit: (habitId, userEmail) => {
        set(state => ({
          habits: state.habits.filter(
            habit => !(habit.id === habitId && habit.userEmail === userEmail),
          ),
        }));
      },

      toggleHabitCompletion: (habitId, date, userEmail) => {
        set(state => ({
          habits: state.habits.map(habit => {
            // Only toggle if habit belongs to current user
            if (habit.id === habitId && habit.userEmail === userEmail) {
              const isCompleted = habit.completedDates.includes(date);
              return {
                ...habit,
                completedDates: isCompleted
                  ? habit.completedDates.filter(d => d !== date)
                  : [...habit.completedDates, date],
              };
            }
            return habit;
          }),
        }));
      },

      getUserHabits: userEmail => {
        const userHabits = get().habits.filter(
          habit => habit.userEmail === userEmail,
        );
        return sortHabitsByPriority(userHabits);
      },

      getHabitById: (habitId, userEmail) => {
        return get().habits.find(
          habit => habit.id === habitId && habit.userEmail === userEmail,
        );
      },

      isHabitCompletedToday: (habitId, userEmail) => {
        const today = getTodayString();
        const habit = get().habits.find(
          h => h.id === habitId && h.userEmail === userEmail,
        );
        return habit ? habit.completedDates.includes(today) : false;
      },

      getTodaysProgress: userEmail => {
        const today = getTodayString();
        const userHabits = get().getUserHabits(userEmail);
        const dailyHabits = userHabits.filter(h => h.frequency === 'daily');
        if (dailyHabits.length === 0) return 0;

        const completedToday = dailyHabits.filter(habit =>
          habit.completedDates.includes(today),
        ).length;

        return Math.round((completedToday / dailyHabits.length) * 100);
      },

      getWeeklyProgress: userEmail => {
        const weekDates = getWeekDates();
        const userHabits = get().getUserHabits(userEmail);
        const dailyHabits = userHabits.filter(h => h.frequency === 'daily');

        return weekDates.map(date => {
          const completedOnDate = dailyHabits.filter(habit =>
            habit.completedDates.includes(date),
          ).length;

          return {
            day: getDayName(date),
            completed: completedOnDate,
            total: dailyHabits.length,
          };
        });
      },

      getHabitsByFilter: (filter, userEmail) => {
        const userHabits = get().getUserHabits(userEmail);
        const today = getTodayString();

        let filteredHabits: Habit[];
        switch (filter) {
          case 'today':
            filteredHabits = userHabits.filter(h => h.frequency === 'daily');
            break;
          case 'completed':
            filteredHabits = userHabits.filter(h =>
              h.completedDates.includes(today),
            );
            break;
          default:
            filteredHabits = userHabits;
            break;
        }

        return sortHabitsByPriority(filteredHabits);
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
