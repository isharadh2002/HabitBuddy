import {SafeAreaView} from 'react-native';
import React from 'react';
import {AuthProvider} from './contexts/AuthContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaView>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaView>
  );
};

export default App;
