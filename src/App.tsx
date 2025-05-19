// App.tsx
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigation/AppNavigator';
import {useAuthStore} from './store/authStore';

const App = () => {
  const {hasHydrated} = useAuthStore.persist;

  if (!hasHydrated) {
    return null; // or loading screen
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
