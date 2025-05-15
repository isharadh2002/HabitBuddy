//src/services/AuthService.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthData {
  user: User;
  token: string;
}

class AuthService {
  // Keys for AsyncStorage
  private USER_STORAGE_KEY = '@HabitBuddy:users';
  private AUTH_DATA_KEY = '@HabitBuddy:auth';

  /**
   * Register a new user
   * @param name User's name
   * @param email User's email
   * @param password User's password
   * @returns Promise with user data or error
   */
  async register(name: string, email: string, password: string): Promise<User> {
    try {
      // Check if the user already exists
      const existingUsers = await this.getUsers();
      const userExists = existingUsers.find(user => user.email === email);

      if (userExists) {
        throw new Error('User with this email already exists');
      }

      // Create a new user
      const newUser: User & {password: string} = {
        id: Date.now().toString(),
        name,
        email,
        password, // In a real app, this should be hashed
      };

      // Save user to "database"
      await this.saveUser(newUser);

      // Return user data without password
      const {password: _, ...userData} = newUser;
      return userData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login a user
   * @param email User's email
   * @param password User's password
   * @returns Promise with user data and token
   */
  async login(email: string, password: string): Promise<AuthData> {
    try {
      const users = await this.getUsers();
      const user = users.find(
        user => user.email === email && user.password === password,
      );

      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Create a simple token (in a real app, this would be more secure)
      const token = `token_${Date.now()}`;

      // Save auth data
      const authData: AuthData = {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      };

      await AsyncStorage.setItem(this.AUTH_DATA_KEY, JSON.stringify(authData));

      return authData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if user is logged in
   * @returns Promise with auth data or null
   */
  async getCurrentUser(): Promise<AuthData | null> {
    try {
      const authDataJSON = await AsyncStorage.getItem(this.AUTH_DATA_KEY);
      if (!authDataJSON) return null;

      return JSON.parse(authDataJSON);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout the current user
   */
  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.AUTH_DATA_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }

  // Private helper methods

  /**
   * Get all users from AsyncStorage
   */
  private async getUsers(): Promise<Array<User & {password: string}>> {
    try {
      const usersJSON = await AsyncStorage.getItem(this.USER_STORAGE_KEY);
      return usersJSON ? JSON.parse(usersJSON) : [];
    } catch (error) {
      console.error('Error getting users:', error);
      return [];
    }
  }

  /**
   * Save a user to AsyncStorage
   */
  private async saveUser(user: User & {password: string}): Promise<void> {
    try {
      const users = await this.getUsers();
      users.push(user);
      await AsyncStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }
}

export default new AuthService();
