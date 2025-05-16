import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import RootNavigator from './navigation/Index';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RootNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
