// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useTheme} from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const logout = useAuthStore(state => state.logout);
  const {theme, isDarkMode} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.background,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 30,
      textAlign: 'center',
    },
    userDetails: {
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      padding: 20,
      marginVertical: 15,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 8,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.error,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      marginVertical: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
    logoutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      gap: 8,
    },
    icon: {
      marginBottom: 10,
      alignSelf: 'center',
    },
  });

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.titleBar}
        barStyle={theme.statusBarStyle}
      />
      <Text style={styles.header}>Your Profile</Text>

      <View style={styles.userDetails}>
        <Icon
          name="account-circle"
          size={48}
          color={theme.text}
          style={styles.icon}
        />
        <Text style={styles.detailText}>Name: {currentUser?.name}</Text>
        <Text style={styles.detailText}>Email: {currentUser?.email}</Text>
        <Text style={styles.detailText}>Birthday: {currentUser?.birthday}</Text>
        <Text style={styles.detailText}>Gender: {currentUser?.gender}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="exit-to-app" size={24} color={theme.error} />
        <Text style={[styles.detailText, {color: theme.error}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
