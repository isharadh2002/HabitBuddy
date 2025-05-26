// src/navigation/AppNavigator.tsx
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import {MainTabNavigator} from './MainTabNavigator';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme/ThemeContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const {theme} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.titleBar,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: true,
      }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="MainTabs"
            component={MainTabNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
