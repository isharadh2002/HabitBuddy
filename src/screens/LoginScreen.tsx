//src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {useAuthStore} from '../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {useTheme} from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);
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
    input: {
      height: 50,
      backgroundColor: theme.inputBackground,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      fontSize: 16,
      color: theme.text,
    },
    button: {
      backgroundColor: theme.buttonBackground,
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
    linkText: {
      color: theme.buttonBackground,
      textAlign: 'center',
      marginTop: 15,
      fontSize: 16,
    },
  });

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    login(email, password);

    if (!useAuthStore.getState().isLoggedIn) {
      Alert.alert('Error', 'Invalid credentials');
    }

    /*if (useAuthStore.getState().isLoggedIn) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }*/
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.titleBar}
        barStyle={theme.statusBarStyle}
      />

      <Text style={styles.header}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.placeholderText}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.placeholderText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>
          Don't have an account? Register here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
