//src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useHabitStore} from '../store/habitStore';
import {useTheme} from '../theme/ThemeContext';

const HomeScreen = () => {
  const currentUser = useAuthStore(state => state.currentUser);
  const {getUserHabits, getTodaysProgress, isHabitCompletedToday} =
    useHabitStore();
  const {theme} = useTheme();

  // Get user-specific data
  const userHabits = currentUser ? getUserHabits(currentUser.email) : [];
  const todaysProgress = currentUser ? getTodaysProgress(currentUser.email) : 0;
  const dailyHabits = userHabits.filter(h => h.frequency === 'daily');
  const completedToday = currentUser
    ? dailyHabits.filter(habit =>
        isHabitCompletedToday(habit.id, currentUser.email),
      )
    : [];
  const pendingToday = currentUser
    ? dailyHabits.filter(
        habit => !isHabitCompletedToday(habit.id, currentUser.email),
      )
    : [];

  // Priority configuration
  const priorityConfig = {
    1: {
      label: '1: Highest',
      icon: 'keyboard-double-arrow-up',
      color: '#FF4444',
    },
    2: {
      label: '2: High',
      icon: 'keyboard-arrow-up',
      color: '#FF8844',
    },
    3: {
      label: '3: Middle',
      icon: 'remove',
      color: '#4A9B7E',
    },
    4: {
      label: '4: Low',
      icon: 'keyboard-arrow-down',
      color: '#44AA88',
    },
    5: {
      label: '5: Lowest',
      icon: 'keyboard-double-arrow-down',
      color: '#4488AA',
    },
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
      paddingBottom: 100,
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
      flexDirection: 'row',
      alignItems: 'center',
    },
    sectionCount: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text + '70',
      marginLeft: 5,
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
    habitIconCompleted: {
      backgroundColor: '#4CAF50' + '20',
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
    habitMeta: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 5,
    },
    habitSubtitle: {
      fontSize: 14,
      color: theme.text + '70',
    },
    priorityIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 10,
    },
    priorityText: {
      fontSize: 11,
      fontWeight: '600',
      marginLeft: 3,
      color: theme.text,
    },
    statusBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      marginBottom: 5,
    },
    statusBadgeCompleted: {
      backgroundColor: '#4CAF50',
    },
    statusBadgePending: {
      backgroundColor: theme.buttonBackground,
    },
    statusText: {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyIcon: {
      marginBottom: 15,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.text + '70',
      textAlign: 'center',
      paddingHorizontal: 40,
      lineHeight: 20,
    },
    motivationText: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: 5,
    },
    emptyViewContainer: {
      height: 120,
      width: '100%',
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

  const getMotivationalMessage = (progress: number) => {
    if (progress === 100) return '🎉 Perfect day achieved!';
    if (progress >= 75) return "🔥 You're on fire today!";
    if (progress >= 50) return '💪 Great progress!';
    if (progress >= 25) return '🌱 Keep going!';
    return "⭐ Let's build some habits!";
  };

  const getHabitIcon = (habitName: string, isCompleted: boolean) => {
    const name = habitName.toLowerCase();
    if (name.includes('water') || name.includes('drink')) return 'local-drink';
    if (
      name.includes('exercise') ||
      name.includes('workout') ||
      name.includes('run')
    )
      return 'fitness-center';
    if (name.includes('read') || name.includes('book')) return 'menu-book';
    if (name.includes('meditate') || name.includes('meditation'))
      return 'self-improvement';
    if (name.includes('journal') || name.includes('write')) return 'edit';
    if (name.includes('clean') || name.includes('tidy'))
      return 'cleaning-services';
    if (name.includes('sleep') || name.includes('bed')) return 'bedtime';
    if (name.includes('walk')) return 'directions-walk';

    return isCompleted ? 'check-circle' : 'radio-button-unchecked';
  };

  // Handle case when user is not logged in
  if (!currentUser) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Please log in</Text>
          <Text style={styles.emptySubtitle}>
            You need to be logged in to view your habits.
          </Text>
        </View>
      </View>
    );
  }

  if (dailyHabits.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.greeting}>
            Hi, {currentUser?.name?.split(' ')[0] || 'User'}!
          </Text>
          <Text style={styles.date}>{getCurrentDate()}</Text>

          <View style={styles.emptyState}>
            <Icon
              name="emoji-nature"
              size={64}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>Ready to start your journey?</Text>
            <Text style={styles.emptySubtitle}>
              Add your first habit and begin building a better version of
              yourself, one day at a time!
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.greeting}>
          Hi, {currentUser?.name?.split(' ')[0] || 'User'}!
        </Text>
        <Text style={styles.date}>{getCurrentDate()}</Text>

        {/* Daily Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressPercentage}>{todaysProgress}%</Text>
            <View style={{flex: 1}}>
              <Text style={styles.progressTitle}>Daily Progress</Text>
              <Text style={styles.progressSubtitle}>
                {getMotivationalMessage(todaysProgress)}
              </Text>
            </View>
          </View>
          <Text style={styles.progressStats}>
            {completedToday.length}/{dailyHabits.length} habits completed today
          </Text>
          <Text style={styles.motivationText}>
            {getMotivationalMessage(todaysProgress)}
          </Text>
        </View>

        {/* Pending Habits */}
        {pendingToday.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text
                style={{fontSize: 18, fontWeight: '600', color: theme.text}}>
                PENDING TODAY
              </Text>
              <Text style={styles.sectionCount}>({pendingToday.length})</Text>
            </View>

            {pendingToday.slice(0, 3).map(habit => {
              const priority = priorityConfig[habit.priority];
              return (
                <View key={habit.id} style={styles.habitCard}>
                  <View style={styles.habitIcon}>
                    <Icon
                      name={getHabitIcon(habit.name, false)}
                      size={24}
                      color={theme.buttonBackground}
                    />
                  </View>
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitTitle}>{habit.name}</Text>
                    <View style={styles.habitMeta}>
                      <Text style={styles.habitSubtitle}>
                        {habit.frequency.charAt(0).toUpperCase() +
                          habit.frequency.slice(1)}{' '}
                        habit
                      </Text>
                      <View style={styles.priorityIndicator}>
                        <Icon
                          name={priority.icon}
                          size={12}
                          color={priority.color}
                        />
                        <Text style={styles.priorityText}>
                          {priority.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={[styles.statusBadge, styles.statusBadgePending]}>
                      <Text style={styles.statusText}>Pending</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}

        {/* Completed Habits */}
        {completedToday.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text
                style={{fontSize: 18, fontWeight: '600', color: theme.text}}>
                COMPLETED TODAY
              </Text>
              <Text style={styles.sectionCount}>({completedToday.length})</Text>
            </View>

            {completedToday.slice(0, 3).map(habit => {
              const priority = priorityConfig[habit.priority];
              return (
                <View key={habit.id} style={styles.habitCard}>
                  <View style={[styles.habitIcon, styles.habitIconCompleted]}>
                    <Icon
                      name={getHabitIcon(habit.name, true)}
                      size={24}
                      color="#4CAF50"
                    />
                  </View>
                  <View style={styles.habitInfo}>
                    <Text style={styles.habitTitle}>{habit.name}</Text>
                    <View style={styles.habitMeta}>
                      <Text style={styles.habitSubtitle}>
                        {habit.frequency.charAt(0).toUpperCase() +
                          habit.frequency.slice(1)}{' '}
                        habit
                      </Text>
                      <View style={styles.priorityIndicator}>
                        <Icon
                          name={priority.icon}
                          size={12}
                          color={priority.color}
                        />
                        <Text style={styles.priorityText}>
                          {priority.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View
                      style={[styles.statusBadge, styles.statusBadgeCompleted]}>
                      <Text style={styles.statusText}>Completed</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </>
        )}
        <View style={styles.emptyViewContainer}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
