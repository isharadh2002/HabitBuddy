// src/screens/LoginScreen.tsx
import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useAuthStore} from '../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore(state => state.login);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    login(email, password);

    if (useAuthStore.getState().isLoggedIn) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        style={{marginTop: 15}}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#111111',
  },
};

export default LoginScreen;
