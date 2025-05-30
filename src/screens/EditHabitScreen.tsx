//src/screens/EditHabitScreen.tsx
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import {useHabitStore} from '../store/habitStore';
import {useAuthStore} from '../store/authStore';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

type EditHabitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EditHabit'
>;
type EditHabitScreenRouteProp = RouteProp<RootStackParamList, 'EditHabit'>;

const EditHabitScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<EditHabitScreenNavigationProp>();
  const route = useRoute<EditHabitScreenRouteProp>();
  const {habitId} = route.params;

  const {editHabit, getHabitById} = useHabitStore();
  const currentUser = useAuthStore(state => state.currentUser);

  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [priority, setPriority] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const priorityOptions = [
    {
      value: 1 as const,
      label: '1: Highest',
      icon: 'keyboard-double-arrow-up',
      color: '#FF4444',
    },
    {
      value: 2 as const,
      label: '2: High',
      icon: 'keyboard-arrow-up',
      color: '#FF8844',
    },
    {value: 3 as const, label: '3: Middle', icon: 'remove', color: '#4A9B7E'},
    {
      value: 4 as const,
      label: '4: Low',
      icon: 'keyboard-arrow-down',
      color: '#44AA88',
    },
    {
      value: 5 as const,
      label: '5: Lowest',
      icon: 'keyboard-double-arrow-down',
      color: '#4488AA',
    },
  ];

  const getCurrentPriorityOption = () => {
    return (
      priorityOptions.find(option => option.value === priority) ||
      priorityOptions[2]
    );
  };

  useEffect(() => {
    if (!currentUser?.email) {
      Alert.alert('Error', 'User not logged in');
      navigation.goBack();
      return;
    }

    const habit = getHabitById(habitId, currentUser.email);
    if (!habit) {
      Alert.alert('Error', 'Habit not found');
      navigation.goBack();
      return;
    }

    setHabitName(habit.name);
    setFrequency(habit.frequency);
    setPriority(habit.priority);
    setIsLoading(false);
  }, [habitId, currentUser, getHabitById, navigation]);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: theme.titleBar,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginLeft: 10,
    },
    content: {
      padding: 20,
      paddingBottom: 100,
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
    priorityContainer: {
      marginBottom: 20,
    },
    prioritySelector: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 12,
      justifyContent: 'space-between',
    },
    priorityContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    priorityIcon: {
      marginRight: 10,
    },
    priorityText: {
      fontSize: 16,
      color: theme.text,
      fontWeight: '500',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: 15,
      paddingVertical: 20,
      paddingHorizontal: 0,
      width: '85%',
      maxWidth: 400,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 12,
    },
    modalHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    modalItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    modalItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    modalItemText: {
      fontSize: 16,
      color: theme.text,
      marginLeft: 12,
      fontWeight: '500',
    },
    separator: {
      height: 1,
      backgroundColor: theme.borderColor,
      marginHorizontal: 15,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 15,
    },
    saveButton: {
      flex: 1,
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
    saveButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    saveButtonDisabled: {
      backgroundColor: theme.borderColor,
    },
    cancelButton: {
      flex: 1,
      backgroundColor: theme.deleteButton,
      borderRadius: 15,
      padding: 18,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    cancelButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      fontSize: 18,
      color: theme.text,
      marginTop: 20,
    },
  });

  const handleSelectPriority = (value: 1 | 2 | 3 | 4 | 5) => {
    setPriority(value);
    setModalVisible(false);
  };

  const handleSave = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    if (!currentUser?.email) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    editHabit(
      habitId,
      habitName.trim(),
      frequency,
      priority,
      currentUser.email,
    );
    Alert.alert(
      'Success',
      `"${habitName}" habit has been updated successfully!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  const handleCancel = () => {
    Alert.alert(
      'Discard Changes',
      'Are you sure you want to discard your changes?',
      [
        {
          text: 'Keep Editing',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ],
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />
        <View style={styles.loadingContainer}>
          <Icon
            name="hourglass-empty"
            size={48}
            color={theme.buttonBackground}
          />
          <Text style={styles.loadingText}>Loading habit...</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.statusBarBackground}]}
      edges={['top', 'bottom']}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.statusBarBackground}
          barStyle={theme.statusBarStyle}
        />

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Edit Habit</Text>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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
                      frequency === 'weekly' &&
                        styles.frequencyButtonTextActive,
                    ]}>
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.priorityContainer}>
              <Text style={styles.label}>Priority</Text>
              <TouchableOpacity
                style={styles.prioritySelector}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}>
                <View style={styles.priorityContent}>
                  <Icon
                    name={getCurrentPriorityOption().icon}
                    size={20}
                    color={getCurrentPriorityOption().color}
                    style={styles.priorityIcon}
                  />
                  <Text style={styles.priorityText}>
                    {getCurrentPriorityOption().label}
                  </Text>
                </View>
                <Icon name="arrow-drop-down" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                !habitName.trim() && styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              disabled={!habitName.trim()}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Priority Selection Modal */}
        <Modal
          animationType="none"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}>
            <Animated.View style={[styles.modalContent, {opacity: fadeAnim}]}>
              <Text style={styles.modalHeader}>Select Priority</Text>
              {priorityOptions.map((option, index) => (
                <React.Fragment key={option.value}>
                  {index > 0 && <View style={styles.separator} />}
                  <Pressable
                    android_ripple={{color: theme.borderColor}}
                    onPress={() => handleSelectPriority(option.value)}
                    style={styles.modalItem}>
                    <View style={styles.modalItemContent}>
                      <Icon name={option.icon} size={22} color={option.color} />
                      <Text style={styles.modalItemText}>{option.label}</Text>
                    </View>
                    {priority === option.value && (
                      <Icon
                        name="check"
                        size={20}
                        color={theme.buttonBackground}
                      />
                    )}
                  </Pressable>
                </React.Fragment>
              ))}
            </Animated.View>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default EditHabitScreen;
