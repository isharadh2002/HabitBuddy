//src/types/Navigation.ts

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

// Define the navigation param list for the entire app
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  // Add more screens here as your app grows
};

// Helper types for screen props
export type ScreenNavigationProp<T extends keyof RootStackParamList> = 
  NativeStackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;

export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp<T>;
  route: ScreenRouteProp<T>;
};