// src/navigation/MainTabNavigator.tsx
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {CustomBottomTabBar} from '../components/CustomBottomTabBar';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import HabitsScreen from '../screens/HabitsScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import ProgressScreen from '../screens/ProgressScreen';
import ProfileScreen from '../screens/ProfileScreen';

export const MainTabNavigator = () => {
  const [activeTab, setActiveTab] = useState('home');
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'habits':
        return <HabitsScreen />;
      case 'add':
        return <AddHabitScreen />;
      case 'progress':
        return <ProgressScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <CustomBottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
};
