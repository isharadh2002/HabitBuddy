// src/components/CustomBottomTabBar.tsx
import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../theme';

const {width} = Dimensions.get('window');

interface CustomBottomTabBarProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

export const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  const {theme} = useTheme();

  const tabs = [
    {name: 'home', icon: 'home'},
    {name: 'search', icon: 'search'},
    {name: 'center', icon: 'add', isCenter: true},
    {name: 'stats', icon: 'bar-chart'},
    {name: 'profile', icon: 'person'},
  ];

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 90,
      paddingBottom: 20,
    },
    tabBar: {
      flexDirection: 'row',
      backgroundColor: theme.cardBackground,
      height: 70,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'space-around',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 10,
      position: 'relative',
    },
    // Create the cutout effect using a pseudo-circle
    cutoutContainer: {
      position: 'absolute',
      top: -30,
      left: 0,
      right: 0,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cutoutOuter: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.background,
      position: 'absolute',
    },
    cutoutInner: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: theme.cardBackground,
      position: 'absolute',
      top: 5,
    },
    tabButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      zIndex: 1,
    },
    centerButton: {
      width: 60,
      height: 60,
      backgroundColor: theme.buttonBackground,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 2,
    },
    activeTab: {
      backgroundColor: theme.buttonBackground + '20',
      borderRadius: 25,
    },
    // Hide the center tab space in the regular tab flow
    centerTabSpace: {
      width: 50,
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {/* Create cutout effect */}
        <View style={styles.cutoutContainer}>
          <View style={styles.cutoutOuter} />
          <View style={styles.cutoutInner} />
          {/* Center floating button */}
          <TouchableOpacity
            style={styles.centerButton}
            onPress={() => onTabPress('center')}
            activeOpacity={0.8}>
            <Icon name="add" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Regular tab buttons */}
        {tabs.map((tab, index) => {
          if (tab.isCenter) {
            // Return empty space for center tab to maintain layout
            return <View key={tab.name} style={styles.centerTabSpace} />;
          }

          const isActive = activeTab === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={[styles.tabButton, isActive && styles.activeTab]}
              onPress={() => onTabPress(tab.name)}
              activeOpacity={0.7}>
              <Icon
                name={tab.icon}
                size={24}
                color={isActive ? theme.buttonBackground : theme.text + '80'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
