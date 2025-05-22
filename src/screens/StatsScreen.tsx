// src/screens/StatsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatsScreen = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.text + '80',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      <Icon
        name="bar-chart"
        size={64}
        color={theme.buttonBackground}
        style={styles.icon}
      />
      <Text style={styles.title}>Statistics</Text>
      <Text style={styles.subtitle}>Track your progress and achievements</Text>
    </View>
  );
};

export default StatsScreen;
