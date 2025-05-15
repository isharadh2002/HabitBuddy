import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HabitBuddy</Text>
      <ActivityIndicator size="large" color="#6200ee" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 24,
  },
  spinner: {
    marginTop: 20,
  },
});

export default LoadingScreen;
