// src/store/habitStore.ts
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
  completedDates: string[]; // Array of date strings (YYYY-MM-DD)
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: 'daily' | 'weekly') => void;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  isHabitCompletedToday: (habitId: string) => boolean;
  getTodaysProgress: () => number;
  getWeeklyProgress: () => {day: string; completed: number; total: number}[];
  getHabitsByFilter: (filter: 'all' | 'today' | 'completed') => Habit[];
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

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: [],

      addHabit: (name, frequency) => {
        const newHabit: Habit = {
          id: Date.now().toString(),
          name,
          frequency,
          createdAt: new Date(),
          completedDates: [],
        };
        set(state => ({habits: [...state.habits, newHabit]}));
      },

      toggleHabitCompletion: (habitId, date) => {
        set(state => ({
          habits: state.habits.map(habit => {
            if (habit.id === habitId) {
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

      isHabitCompletedToday: habitId => {
        const today = getTodayString();
        const habit = get().habits.find(h => h.id === habitId);
        return habit ? habit.completedDates.includes(today) : false;
      },

      getTodaysProgress: () => {
        const today = getTodayString();
        const dailyHabits = get().habits.filter(h => h.frequency === 'daily');
        if (dailyHabits.length === 0) return 0;

        const completedToday = dailyHabits.filter(habit =>
          habit.completedDates.includes(today),
        ).length;

        return Math.round((completedToday / dailyHabits.length) * 100);
      },

      getWeeklyProgress: () => {
        const weekDates = getWeekDates();
        const dailyHabits = get().habits.filter(h => h.frequency === 'daily');

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

      getHabitsByFilter: filter => {
        const habits = get().habits;
        const today = getTodayString();

        switch (filter) {
          case 'today':
            return habits.filter(h => h.frequency === 'daily');
          case 'completed':
            return habits.filter(h => h.completedDates.includes(today));
          default:
            return habits;
        }
      },
    }),
    {
      name: 'habit-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
