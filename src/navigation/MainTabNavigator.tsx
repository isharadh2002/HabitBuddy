// src/navigation/MainTabNavigator.tsx
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme} from '../theme';
import {CustomBottomTabBar} from '../components/CustomBottomTabBar';

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import AddScreen from '../screens/AddScreen';
import StatsScreen from '../screens/StatsScreen';
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
      case 'search':
        return <SearchScreen />;
      case 'center':
        return <AddScreen />;
      case 'stats':
        return <StatsScreen />;
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
