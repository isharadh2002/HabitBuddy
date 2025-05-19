// src/navigation/AppNavigator.tsx
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import {useAuthStore} from '../store/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <Stack.Navigator>
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
