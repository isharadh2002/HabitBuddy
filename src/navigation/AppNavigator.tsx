// src/navigation/AppNavigator.tsx
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const {theme, isDarkMode} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.titleBar, // Use your theme color
        },
        headerTintColor: theme.text, // Text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      }}>
      {isLoggedIn ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
