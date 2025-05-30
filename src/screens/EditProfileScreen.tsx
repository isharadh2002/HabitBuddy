//src/screens/EditProfileScreen.tsx
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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme/ThemeContext';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = ({navigation}: Props) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const updateUser = useAuthStore(state => state.updateUser);
  const {theme} = useTheme();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    backButton: {
      marginRight: 15,
      padding: 8,
      borderRadius: 20,
      backgroundColor: theme.cardBackground,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      flex: 1,
    },
    section: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 15,
    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
      marginBottom: 8,
      marginTop: 12,
    },
    firstInputLabel: {
      marginTop: 0,
    },
    input: {
      height: 50,
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: 16,
      color: theme.text,
    },
    passwordToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 10,
    },
    toggleText: {
      fontSize: 16,
      color: theme.buttonBackground,
      marginLeft: 8,
      fontWeight: '500',
    },
    saveButton: {
      backgroundColor: theme.buttonBackground,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    cancelButton: {
      backgroundColor: 'transparent',
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      marginTop: 10,
    },
    cancelButtonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '500',
    },
    warningText: {
      fontSize: 12,
      color: theme.text + '70',
      marginTop: 8,
      fontStyle: 'italic',
    },
  });

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return false;
    }

    if (!email.trim()) {
      Alert.alert('Error', 'Email cannot be empty');
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (isChangingPassword) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        Alert.alert('Error', 'Please fill all password fields');
        return false;
      }

      if (currentPassword !== currentUser?.password) {
        Alert.alert('Error', 'Current password is incorrect');
        return false;
      }

      if (newPassword.length < 6) {
        Alert.alert('Error', 'New password must be at least 6 characters long');
        return false;
      }

      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'New passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validateInputs() || !currentUser) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      password: isChangingPassword ? newPassword : currentUser.password,
    };

    updateUser(currentUser.email, updatedUser);

    Alert.alert('Success', 'Profile updated successfully!', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const handleCancel = () => {
    // Reset form to original values
    setName(currentUser?.name || '');
    setEmail(currentUser?.email || '');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsChangingPassword(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}>
            <Icon name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>

        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <Text style={[styles.inputLabel, styles.firstInputLabel]}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor={theme.placeholderText}
          />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={theme.placeholderText}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.warningText}>
            Changing your email will require you to log in again with the new
            email.
          </Text>
        </View>

        {/* Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <TouchableOpacity
            style={styles.passwordToggle}
            onPress={() => {
              setIsChangingPassword(!isChangingPassword);
              if (isChangingPassword) {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }
            }}
            activeOpacity={0.7}>
            <Icon
              name={
                isChangingPassword ? 'check-box' : 'check-box-outline-blank'
              }
              size={20}
              color={theme.buttonBackground}
            />
            <Text style={styles.toggleText}>Change Password</Text>
          </TouchableOpacity>

          {isChangingPassword && (
            <>
              <Text style={styles.inputLabel}>Current Password</Text>
              <TextInput
                value={currentPassword}
                onChangeText={setCurrentPassword}
                style={styles.input}
                placeholder="Enter current password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>New Password</Text>
              <TextInput
                value={newPassword}
                onChangeText={setNewPassword}
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />

              <Text style={styles.inputLabel}>Confirm New Password</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={theme.placeholderText}
                secureTextEntry
              />
              <Text style={styles.warningText}>
                Password must be at least 6 characters long.
              </Text>
            </>
          )}
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Bottom spacing for scroll */}
        <View style={{height: 30}} />
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;
