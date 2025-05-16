import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import {useAuthStore} from '../store/UseAuthStore';
import LoadingIndicator from '../components/LoadingIndicator';

const RootNavigator = () => {
  const {isAuthenticated, isLoading, checkAuth} = useAuthStore();

  useEffect(() => {
    // Check if user is already logged in when app starts
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingIndicator message="Loading..." />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
