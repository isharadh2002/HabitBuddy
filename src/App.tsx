// App.tsx
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AppNavigator} from './navigation/AppNavigator';
import {useAuthStore} from './store/authStore';
import LoadingScreen from './screens/LoadingScreen';
import {ThemeProvider} from './theme/ThemeContext';

const App = () => {
  const {hasHydrated} = useAuthStore.persist;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add a minimum 2-second loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // If hydration completes before 2 seconds, still wait for the full duration
    return () => clearTimeout(timer);
  }, []);

  // Show loading screen if still loading OR if store hasn't hydrated
  if (isLoading || !hasHydrated) {
    return (
      <ThemeProvider>
        <LoadingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
