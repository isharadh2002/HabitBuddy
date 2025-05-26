// src/screens/AddHabitScreen.tsx
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import {useTheme} from '../theme';
import {useHabitStore} from '../store/habitStore';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddHabitScreen = () => {
  const {theme} = useTheme();
  const addHabit = useHabitStore(state => state.addHabit);

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

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
    formSection: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 10,
    },
    input: {
      height: 50,
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      color: theme.text,
      marginBottom: 20,
    },
    frequencyContainer: {
      marginBottom: 20,
    },
    frequencyOptions: {
      flexDirection: 'row',
      gap: 10,
    },
    frequencyButton: {
      flex: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: theme.borderColor,
      alignItems: 'center',
    },
    frequencyButtonActive: {
      backgroundColor: theme.buttonBackground,
      borderColor: theme.buttonBackground,
    },
    frequencyButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
    },
    frequencyButtonTextActive: {
      color: 'white',
    },
    submitButton: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 15,
      padding: 18,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    submitButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    submitButtonDisabled: {
      backgroundColor: theme.borderColor,
    },
    habitExamples: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      padding: 20,
      marginBottom: 20,
    },
    exampleTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    exampleItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    exampleText: {
      fontSize: 14,
      color: theme.text + '80',
      marginLeft: 10,
    },
  });

  const handleSubmit = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    addHabit(habitName.trim(), frequency);
    setHabitName('');
    Alert.alert(
      'Success',
      `"${habitName}" habit has been added successfully!`,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
    );
  };

  const dailyExamples = [
    'Drink 8 glasses of water',
    'Exercise for 30 minutes',
    'Read for 20 minutes',
    'Meditate for 10 minutes',
    'Write in journal',
  ];

  const weeklyExamples = [
    'Clean the house',
    'Meal prep for the week',
    'Call family members',
    'Review weekly goals',
    'Deep clean workspace',
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Icon name="add-circle" size={32} color={theme.buttonBackground} />
          <Text style={styles.title}>Add New Habit</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter habit name..."
            placeholderTextColor={theme.placeholderText}
            value={habitName}
            onChangeText={setHabitName}
            maxLength={50}
          />

          <View style={styles.frequencyContainer}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyOptions}>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === 'daily' && styles.frequencyButtonActive,
                ]}
                onPress={() => setFrequency('daily')}>
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === 'daily' && styles.frequencyButtonTextActive,
                  ]}>
                  Daily
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === 'weekly' && styles.frequencyButtonActive,
                ]}
                onPress={() => setFrequency('weekly')}>
                <Text
                  style={[
                    styles.frequencyButtonText,
                    frequency === 'weekly' && styles.frequencyButtonTextActive,
                  ]}>
                  Weekly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.habitExamples}>
          <Text style={styles.exampleTitle}>
            {frequency === 'daily' ? 'Daily' : 'Weekly'} Habit Examples
          </Text>
          {(frequency === 'daily' ? dailyExamples : weeklyExamples).map(
            (example, index) => (
              <View key={index} style={styles.exampleItem}>
                <Icon
                  name="lightbulb-outline"
                  size={16}
                  color={theme.buttonBackground}
                />
                <Text style={styles.exampleText}>{example}</Text>
              </View>
            ),
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            !habitName.trim() && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!habitName.trim()}>
          <Text style={styles.submitButtonText}>Create Habit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddHabitScreen;
