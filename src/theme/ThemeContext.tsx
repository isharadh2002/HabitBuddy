// src/theme/ThemeContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {lightTheme, darkTheme, Theme} from './colorScheme';

type ThemePreference = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  themePreference: ThemePreference;
  setThemePreference: (pref: ThemePreference) => void;
  isDarkMode: boolean;
}

const STORAGE_KEY = 'app-theme-preference';

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  themePreference: 'system',
  setThemePreference: () => {},
  isDarkMode: false,
});

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themePreference, setThemePreferenceState] =
    useState<ThemePreference>('system');
  const [theme, setTheme] = useState<Theme>(lightTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
          setThemePreferenceState(stored);
        }
      } catch (error) {
        console.warn('Error loading theme preference:', error);
      }
    };
    loadThemePreference();
  }, []);

  // Update theme whenever preference or system theme changes
  useEffect(() => {
    let resolvedTheme: Theme;
    let resolvedIsDarkMode: boolean;

    switch (themePreference) {
      case 'light':
        resolvedTheme = lightTheme;
        resolvedIsDarkMode = false;
        break;
      case 'dark':
        resolvedTheme = darkTheme;
        resolvedIsDarkMode = true;
        break;
      case 'system':
      default:
        resolvedTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
        resolvedIsDarkMode = systemColorScheme === 'dark';
        break;
    }

    setTheme(resolvedTheme);
    setIsDarkMode(resolvedIsDarkMode);
  }, [themePreference, systemColorScheme]);

  // Save theme preference to storage
  const setThemePreference = async (pref: ThemePreference) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, pref);
      setThemePreferenceState(pref);
    } catch (error) {
      console.warn('Error saving theme preference:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themePreference,
        setThemePreference,
        isDarkMode,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
