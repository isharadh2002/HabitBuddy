// src/store/authStore.ts
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  register: (user: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  updateUser: (oldEmail: string, updatedUser: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoggedIn: false,
      register: user => set(state => ({users: [...state.users, user]})),
      login: (email, password) => {
        const user = get().users.find(
          u => u.email === email && u.password === password,
        );
        if (user) {
          set({currentUser: user, isLoggedIn: true});
        }
      },
      logout: () => set({currentUser: null, isLoggedIn: false}),
      updateUser: (oldEmail, updatedUser) => {
        set(state => ({
          users: state.users.map(user =>
            user.email === oldEmail ? updatedUser : user,
          ),
          currentUser:
            state.currentUser?.email === oldEmail
              ? updatedUser
              : state.currentUser,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
