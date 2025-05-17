import { create } from 'zustand';
import { AuthState, User } from '../types';
import { 
  clearCurrentUser, 
  findUserByEmail, 
  getCurrentUser, 
  setCurrentUser, 
  storeUser 
} from '../services/StorageService';
import { validateEmail, validatePassword } from '../utils/Validation';

// Generate a simple ID for new users
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  // Check if user is already authenticated
  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const user = await getCurrentUser();
      
      if (user) {
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false,
          error: null 
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false,
          error: null 
        });
      }
    } catch (error) {
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: 'Failed to check authentication status' 
      });
    }
  },

  // Login function
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Basic validation
      if (!email || !password) {
        set({ isLoading: false, error: 'Please enter email and password' });
        return;
      }
      
      if (!validateEmail(email)) {
        set({ isLoading: false, error: 'Invalid email format' });
        return;
      }
      
      // Find user by email
      const user = await findUserByEmail(email);
      
      if (!user) {
        set({ isLoading: false, error: 'User not found' });
        return;
      }
      
      // Check password
      if (user.password !== password) {
        set({ isLoading: false, error: 'Invalid credentials' });
        return;
      }
      
      // Set current user and update state
      const { password: _, ...userWithoutPassword } = user;
      await setCurrentUser(userWithoutPassword);
      
      set({ 
        user: userWithoutPassword, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'Failed to log in. Please try again.' 
      });
    }
  },

  // Register function
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Basic validation
      if (!name || !email || !password) {
        set({ isLoading: false, error: 'Please fill all fields' });
        return;
      }
      
      if (!validateEmail(email)) {
        set({ isLoading: false, error: 'Invalid email format' });
        return;
      }
      
      if (!validatePassword(password)) {
        set({ isLoading: false, error: 'Password must be at least 6 characters' });
        return;
      }
      
      // Check if user already exists
      const existingUser = await findUserByEmail(email);
      
      if (existingUser) {
        set({ isLoading: false, error: 'Email already registered' });
        return;
      }
      
      // Create new user
      const newUser = {
        id: generateId(),
        name,
        email,
        password
      };
      
      // Store user
      await storeUser(newUser);
      
      // Set current user and update state
      const { password: _, ...userWithoutPassword } = newUser;
      await setCurrentUser(userWithoutPassword);
      
      set({ 
        user: userWithoutPassword, 
        isAuthenticated: true, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'Failed to register. Please try again.' 
      });
    }
  },

  // Logout function
  logout: async () => {
    set({ isLoading: true });
    
    try {
      await clearCurrentUser();
      
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false,
        error: null 
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: 'Failed to log out. Please try again.' 
      });
    }
  }
}));