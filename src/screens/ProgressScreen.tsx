// src/screens/ProgressScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme';
import {useHabitStore} from '../store/habitStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const ProgressScreen = () => {
  const {theme} = useTheme();
  const {habits, getTodaysProgress, getWeeklyProgress, isHabitCompletedToday} =
    useHabitStore();

  const todaysProgress = getTodaysProgress();
  const weeklyProgress = getWeeklyProgress();
  const dailyHabits = habits.filter(h => h.frequency === 'daily');
  const weeklyHabits = habits.filter(h => h.frequency === 'weekly');

  // Get today's completed habits
  const completedTodayCount = dailyHabits.filter(habit =>
    isHabitCompletedToday(habit.id),
  ).length;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    progressCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 20,
      padding: 25,
      marginBottom: 25,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    progressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    progressIcon: {
      width: 50,
      height: 50,
      backgroundColor: theme.buttonBackground + '20',
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    progressInfo: {
      flex: 1,
    },
    progressTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    progressSubtitle: {
      fontSize: 14,
      color: theme.text + '70',
    },
    progressPercentage: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.buttonBackground,
      textAlign: 'center',
      marginVertical: 15,
    },
    progressBar: {
      height: 8,
      backgroundColor: theme.borderColor,
      borderRadius: 4,
      overflow: 'hidden',
      marginVertical: 10,
    },
    progressBarFill: {
      height: '100%',
      backgroundColor: theme.buttonBackground,
      borderRadius: 4,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.buttonBackground,
      marginBottom: 5,
    },
    statLabel: {
      fontSize: 12,
      color: theme.text + '70',
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 15,
      marginTop: 10,
    },
    weeklyChart: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
      textAlign: 'center',
    },
    chartContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'end',
      height: 120,
      paddingTop: 20,
    },
    chartBar: {
      alignItems: 'center',
      flex: 1,
    },
    bar: {
      width: 20,
      backgroundColor: theme.buttonBackground,
      borderRadius: 10,
      marginBottom: 8,
      minHeight: 4,
    },
    chartDay: {
      fontSize: 12,
      color: theme.text + '70',
      fontWeight: '600',
    },
    chartValue: {
      fontSize: 10,
      color: theme.text + '60',
      marginBottom: 4,
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
    },
    summaryCard: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    summaryText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
    },
    summaryEmoji: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 10,
    },
  });

  const getMotivationalMessage = (progress: number) => {
    if (progress === 100)
      return "🎉 Perfect day! You've completed all your habits!";
    if (progress >= 75) return "🔥 Amazing progress! You're almost there!";
    if (progress >= 50) return '💪 Great job! Keep the momentum going!';
    if (progress >= 25) return '🌱 Good start! Every step counts!';
    return '⭐ Ready to build some great habits today?';
  };

  if (habits.length === 0) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.content}>
          <View style={styles.header}>
            <Icon name="trending-up" size={32} color={theme.buttonBackground} />
            <Text style={styles.title}>Progress</Text>
          </View>

          <View style={styles.emptyState}>
            <Icon
              name="show-chart"
              size={64}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>No habits to track yet</Text>
            <Text style={styles.emptySubtitle}>
              Add some habits first to see your progress and track your journey!
            </Text>
          </View>
        </View>
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
        <View style={styles.header}>
          <Icon name="trending-up" size={32} color={theme.buttonBackground} />
          <Text style={styles.title}>Progress</Text>
        </View>

        {/* Motivational Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryEmoji}>
            {todaysProgress === 100 ? '🎉' : todaysProgress >= 50 ? '🔥' : '⭐'}
          </Text>
          <Text style={styles.summaryText}>
            {getMotivationalMessage(todaysProgress)}
          </Text>
        </View>

        {/* Today's Progress */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <Icon name="today" size={24} color={theme.buttonBackground} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
              <Text style={styles.progressSubtitle}>
                {completedTodayCount} of {dailyHabits.length} daily habits
                completed
              </Text>
            </View>
          </View>

          <Text style={styles.progressPercentage}>{todaysProgress}%</Text>

          <View style={styles.progressBar}>
            <View
              style={[styles.progressBarFill, {width: `${todaysProgress}%`}]}
            />
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{completedTodayCount}</Text>
              <Text style={styles.statLabel}>Completed{'\n'}Today</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{dailyHabits.length}</Text>
              <Text style={styles.statLabel}>Daily{'\n'}Habits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{weeklyHabits.length}</Text>
              <Text style={styles.statLabel}>Weekly{'\n'}Habits</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{habits.length}</Text>
              <Text style={styles.statLabel}>Total{'\n'}Habits</Text>
            </View>
          </View>
        </View>

        {/* Weekly Progress Chart */}
        {dailyHabits.length > 0 && (
          <View style={styles.weeklyChart}>
            <Text style={styles.chartTitle}>7-Day Progress</Text>
            <View style={styles.chartContainer}>
              {weeklyProgress.map((day, index) => {
                const percentage =
                  day.total > 0 ? (day.completed / day.total) * 100 : 0;
                const barHeight = Math.max((percentage / 100) * 80, 4);

                return (
                  <View key={index} style={styles.chartBar}>
                    <Text style={styles.chartValue}>
                      {day.completed}/{day.total}
                    </Text>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: barHeight,
                          backgroundColor:
                            percentage === 100
                              ? '#4CAF50'
                              : percentage >= 50
                              ? theme.buttonBackground
                              : theme.borderColor,
                        },
                      ]}
                    />
                    <Text style={styles.chartDay}>{day.day}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Achievement Summary */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <View style={styles.progressIcon}>
              <Icon
                name="emoji-events"
                size={24}
                color={theme.buttonBackground}
              />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Quick Stats</Text>
              <Text style={styles.progressSubtitle}>
                Your habit journey at a glance
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {Math.round(
                  weeklyProgress.reduce(
                    (acc, day) =>
                      acc +
                      (day.total > 0 ? (day.completed / day.total) * 100 : 0),
                    0,
                  ) / 7,
                )}
                %
              </Text>
              <Text style={styles.statLabel}>7-Day{'\n'}Average</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {
                  weeklyProgress.filter(
                    day => day.total > 0 && day.completed === day.total,
                  ).length
                }
              </Text>
              <Text style={styles.statLabel}>Perfect{'\n'}Days</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {weeklyProgress.reduce((acc, day) => acc + day.completed, 0)}
              </Text>
              <Text style={styles.statLabel}>Total{'\n'}Completed</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;
