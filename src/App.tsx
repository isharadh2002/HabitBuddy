//src/App.tsx

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';
import {LogBox} from 'react-native';

// Ignore specific warnings if they're coming from dependencies
LogBox.ignoreLogs(['AsyncStorage has been extracted']);

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
