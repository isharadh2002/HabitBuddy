import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  name: string;
  password: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: 'dummy_token', // In a real app, generate proper token
  isAuthenticated: false,
  isLoading: true,

  login: async (email, password) => {
    const usersString = await AsyncStorage.getItem('users');
    const users: User[] = usersString ? JSON.parse(usersString) : [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      set({ user, isAuthenticated: true });
      await AsyncStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      throw new Error('Invalid credentials');
    }
  },

  register: async (user) => {
    const usersString = await AsyncStorage.getItem('users');
    const users: User[] = usersString ? JSON.parse(usersString) : [];
    
    if (users.some(u => u.email === user.email)) {
      throw new Error('User already exists');
    }
    
    users.push(user);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    set({ user, isAuthenticated: true });
    await AsyncStorage.setItem('currentUser', JSON.stringify(user));
  },

  logout: async () => {
    await AsyncStorage.removeItem('currentUser');
    set({ user: null, isAuthenticated: false });
  },

  hydrate: async () => {
    try {
      const userString = await AsyncStorage.getItem('currentUser');
      if (userString) {
        const user = JSON.parse(userString);
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false }); // Add this else block
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));

// Hydrate store on initial load
useAuthStore.getState().hydrate();