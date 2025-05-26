// src/screens/HabitsScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useHabitStore, Habit} from '../store/habitStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

type FilterType = 'all' | 'today' | 'completed';

const HabitsScreen = () => {
  const {theme} = useTheme();
  const {
    habits,
    toggleHabitCompletion,
    isHabitCompletedToday,
    getHabitsByFilter,
  } = useHabitStore();

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const filteredHabits = getHabitsByFilter(activeFilter);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      flex: 1,
      padding: 20,
      paddingBottom: 100,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    filterContainer: {
      flexDirection: 'row',
      marginBottom: 20,
      gap: 10,
    },
    filterButton: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: theme.cardBackground,
      borderWidth: 2,
      borderColor: theme.borderColor,
      alignItems: 'center',
    },
    filterButtonActive: {
      backgroundColor: theme.buttonBackground,
      borderColor: theme.buttonBackground,
    },
    filterButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    filterButtonTextActive: {
      color: 'white',
    },
    habitCard: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    habitHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    habitInfo: {
      flex: 1,
      marginRight: 15,
    },
    habitName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 5,
    },
    habitFrequency: {
      fontSize: 14,
      color: theme.text + '70',
      marginBottom: 8,
    },
    habitStatus: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusText: {
      fontSize: 14,
      marginLeft: 5,
      fontWeight: '600',
    },
    statusCompleted: {
      color: '#4CAF50',
    },
    statusPending: {
      color: theme.text + '70',
    },
    completeButton: {
      backgroundColor: theme.buttonBackground,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 100,
    },
    completeButtonCompleted: {
      backgroundColor: '#4CAF50',
    },
    completeButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 50,
    },
    emptyIcon: {
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.text + '70',
      textAlign: 'center',
      paddingHorizontal: 40,
      lineHeight: 22,
    },
    habitCount: {
      fontSize: 16,
      color: theme.text + '80',
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  const handleToggleCompletion = (habitId: string) => {
    const today = getTodayString();
    toggleHabitCompletion(habitId, today);
  };

  const renderHabitItem = ({item}: {item: Habit}) => {
    const isCompleted = isHabitCompletedToday(item.id);

    return (
      <View style={styles.habitCard}>
        <View style={styles.habitHeader}>
          <View style={styles.habitInfo}>
            <Text style={styles.habitName}>{item.name}</Text>
            <Text style={styles.habitFrequency}>
              {item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1)}{' '}
              habit
            </Text>
            <View style={styles.habitStatus}>
              <Icon
                name={isCompleted ? 'check-circle' : 'radio-button-unchecked'}
                size={20}
                color={isCompleted ? '#4CAF50' : theme.text + '50'}
              />
              <Text
                style={[
                  styles.statusText,
                  isCompleted ? styles.statusCompleted : styles.statusPending,
                ]}>
                {isCompleted ? 'Completed today' : 'Not completed'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.completeButton,
              isCompleted && styles.completeButtonCompleted,
            ]}
            onPress={() => handleToggleCompletion(item.id)}>
            <Text style={styles.completeButtonText}>
              {isCompleted ? 'Undo' : 'Complete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getEmptyStateContent = () => {
    switch (activeFilter) {
      case 'today':
        return {
          icon: 'today',
          title: 'No daily habits',
          subtitle: 'Add some daily habits to track your progress!',
        };
      case 'completed':
        return {
          icon: 'check-circle',
          title: 'No completed habits',
          subtitle: 'Complete some habits today to see them here!',
        };
      default:
        return {
          icon: 'list',
          title: 'No habits yet',
          subtitle: 'Start building better habits by adding your first one!',
        };
    }
  };

  const emptyState = getEmptyStateContent();

  const filters = [
    {key: 'all' as FilterType, label: 'All Habits'},
    {key: 'today' as FilterType, label: "Today's Habits"},
    {key: 'completed' as FilterType, label: 'Completed'},
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Icon name="list" size={32} color={theme.buttonBackground} />
          <Text style={styles.title}>My Habits</Text>
        </View>

        <View style={styles.filterContainer}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                activeFilter === filter.key && styles.filterButtonActive,
              ]}
              onPress={() => setActiveFilter(filter.key)}>
              <Text
                style={[
                  styles.filterButtonText,
                  activeFilter === filter.key && styles.filterButtonTextActive,
                ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredHabits.length > 0 && (
          <Text style={styles.habitCount}>
            {filteredHabits.length}{' '}
            {filteredHabits.length === 1 ? 'habit' : 'habits'}
          </Text>
        )}

        {filteredHabits.length > 0 ? (
          <FlatList
            data={filteredHabits}
            renderItem={renderHabitItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon
              name={emptyState.icon}
              size={64}
              color={theme.buttonBackground}
              style={styles.emptyIcon}
            />
            <Text style={styles.emptyTitle}>{emptyState.title}</Text>
            <Text style={styles.emptySubtitle}>{emptyState.subtitle}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HabitsScreen;
