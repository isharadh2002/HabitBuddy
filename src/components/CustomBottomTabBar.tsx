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
    {name: 'center', icon: 'add', isCenter: true}, // This will be the floating button
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
    },
    tabBarWithCutout: {
      position: 'relative',
    },
    cutout: {
      position: 'absolute',
      top: -25,
      left: '50%',
      marginLeft: -35,
      width: 70,
      height: 70,
      backgroundColor: theme.background,
      borderRadius: 35,
    },
    innerCutout: {
      position: 'absolute',
      top: 5,
      left: 5,
      width: 60,
      height: 60,
      backgroundColor: theme.cardBackground,
      borderRadius: 30,
    },
    tabButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
    },
    centerButton: {
      position: 'absolute',
      top: -35,
      left: '50%',
      marginLeft: -30,
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
    },
    activeTab: {
      backgroundColor: theme.buttonBackground + '20',
      borderRadius: 25,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.tabBar, styles.tabBarWithCutout]}>
        {/* Cutout background */}
        <View style={styles.cutout}>
          <View style={styles.innerCutout} />
        </View>

        {/* Tab buttons */}
        {tabs.map((tab, index) => {
          if (tab.isCenter) {
            return (
              <TouchableOpacity
                key={tab.name}
                style={styles.centerButton}
                onPress={() => onTabPress(tab.name)}
                activeOpacity={0.8}>
                <Icon name={tab.icon} size={30} color="white" />
              </TouchableOpacity>
            );
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
