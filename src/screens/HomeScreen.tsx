// src/screens/HomeScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme';

const HomeScreen = () => {
  const currentUser = useAuthStore(state => state.currentUser);
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
    },
    greeting: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    date: {
      fontSize: 16,
      color: theme.text + '80',
      marginBottom: 30,
    },
    progressCard: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 20,
      padding: 20,
      marginBottom: 30,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    progressTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginLeft: 10,
    },
    progressSubtitle: {
      fontSize: 14,
      color: 'white',
      opacity: 0.8,
      marginLeft: 10,
      marginBottom: 15,
    },
    progressStats: {
      fontSize: 12,
      color: 'white',
      opacity: 0.9,
      marginLeft: 10,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    progressPercentage: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    habitCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 15,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    habitIcon: {
      width: 50,
      height: 50,
      backgroundColor: theme.buttonBackground + '20',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    habitInfo: {
      flex: 1,
    },
    habitTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 5,
    },
    habitSubtitle: {
      fontSize: 14,
      color: theme.text + '70',
    },
    habitMeta: {
      alignItems: 'center',
    },
    habitTime: {
      fontSize: 12,
      color: theme.text + '60',
      marginBottom: 5,
    },
    chatButton: {
      backgroundColor: theme.buttonBackground,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    chatButtonText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
  });

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          Hi, {currentUser?.name?.split(' ')[0] || 'User'}
        </Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>

        {/* Daily Goals Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressPercentage}>25%</Text>
            <View style={{flex: 1}}>
              <Text style={styles.progressTitle}>Daily Goals</Text>
              <Text style={styles.progressSubtitle}>
                Almost there! Goals in reach!
              </Text>
            </View>
          </View>
          <Text style={styles.progressStats}>1/5 habits 1/3 challenges</Text>
        </View>

        {/* In Progress Section */}
        <Text style={styles.sectionHeader}>IN PROGRESS (2)</Text>

        <View style={styles.habitCard}>
          <View style={styles.habitIcon}>
            <Icon
              name="cleaning-services"
              size={24}
              color={theme.buttonBackground}
            />
          </View>
          <View style={styles.habitInfo}>
            <Text style={styles.habitTitle}>Tidying Challenge</Text>
            <Text style={styles.habitSubtitle}>
              Separate items for donation and trash
            </Text>
          </View>
          <View style={styles.habitMeta}>
            <Text style={styles.habitTime}>07:41:12</Text>
            <View style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Chat</Text>
            </View>
          </View>
        </View>

        <View style={styles.habitCard}>
          <View style={styles.habitIcon}>
            <Icon
              name="self-improvement"
              size={24}
              color={theme.buttonBackground}
            />
          </View>
          <View style={styles.habitInfo}>
            <Text style={styles.habitTitle}>Happy Habits Challenge</Text>
            <Text style={styles.habitSubtitle}>Daily mindfulness practice</Text>
          </View>
          <View style={styles.habitMeta}>
            <Text style={styles.habitTime}>02:15:30</Text>
            <View style={styles.chatButton}>
              <Text style={styles.chatButtonText}>Chat</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
