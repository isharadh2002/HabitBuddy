import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from '../types';

// Keys for AsyncStorage
const STORAGE_KEYS = {
  USERS: 'habitbuddy_users',
  CURRENT_USER: 'habitbuddy_current_user',
};

// Store a user in AsyncStorage
export const storeUser = async (
  user: User & {password: string},
): Promise<void> => {
  try {
    // Get existing users (if any)
    const existingUsersJSON = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    const existingUsers = existingUsersJSON
      ? JSON.parse(existingUsersJSON)
      : [];

    // Add or update user
    const userIndex = existingUsers.findIndex(
      (u: User) => u.email === user.email,
    );

    if (userIndex >= 0) {
      existingUsers[userIndex] = user;
    } else {
      existingUsers.push(user);
    }

    // Save back to AsyncStorage
    await AsyncStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify(existingUsers),
    );
  } catch (error) {
    console.error('Error storing user:', error);
    throw new Error('Failed to store user data');
  }
};

// Store current user (login session)
export const setCurrentUser = async (user: User): Promise<void> => {
  try {
    const {password, ...userWithoutPassword} = user as User & {
      password?: string;
    };
    await AsyncStorage.setItem(
      STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(userWithoutPassword),
    );
  } catch (error) {
    console.error('Error setting current user:', error);
    throw new Error('Failed to set current user');
  }
};

// Get current user (if logged in)
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJSON = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return userJSON ? JSON.parse(userJSON) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Find user by email
export const findUserByEmail = async (
  email: string,
): Promise<(User & {password: string}) | null> => {
  try {
    const usersJSON = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    const users = usersJSON ? JSON.parse(usersJSON) : [];

    const user = users.find(
      (u: User & {password: string}) => u.email === email,
    );
    return user || null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

// Clear current user (logout)
export const clearCurrentUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (error) {
    console.error('Error clearing current user:', error);
    throw new Error('Failed to log out');
  }
};

// Clear all data (for testing purposes)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USERS,
      STORAGE_KEYS.CURRENT_USER,
    ]);
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
