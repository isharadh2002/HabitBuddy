// src/theme.ts
import {useColorScheme} from 'react-native';

export type Theme = {
  background: string;
  text: string;
  titleBar: string;
  buttonBackground: string;
  statusBarBackground: string;
  statusBarStyle: 'dark-content' | 'light-content';
  inputBackground: string;
  cardBackground: string;
  borderColor: string;
  error: string;
  deleteButton: string;
  placeholderText: string;
};

export const lightTheme: Theme = {
  background: '#F0F7F4',
  text: '#23423D',
  titleBar: '#C8E6D1',
  buttonBackground: '#4A9B7E',
  statusBarBackground: '#C8E6D1',
  statusBarStyle: 'dark-content',
  inputBackground: '#FFFFFF',
  cardBackground: '#FFFFFF',
  borderColor: '#B2D3C2',
  error: '#E63946',
  deleteButton: '#FF4757',
  placeholderText: '#777777',
};

export const darkTheme: Theme = {
  background: '#1A2E28',
  text: '#E8F3EC',
  titleBar: '#2D4A3F',
  buttonBackground: '#3D8569',
  statusBarBackground: '#2D4A3F',
  statusBarStyle: 'light-content',
  inputBackground: '#2D4A3F',
  cardBackground: '#23423D',
  borderColor: '#3D8569',
  error: '#FF6B6B',
  deleteButton: '#FF6B7A',
  placeholderText: '#AAAAAA',
};

/*export const useTheme = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  return {theme, isDarkMode};
};*/
