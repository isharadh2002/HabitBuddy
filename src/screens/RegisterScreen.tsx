// src/screens/RegisterScreen.tsx
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

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const register = useAuthStore(state => state.register);

  const handleRegister = () => {
    if (!name || !email || !birthday || !gender || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    register({name, email, birthday, gender, password});
    Alert.alert('Success', 'Registration successful! Please login');
    navigation.navigate('Login');
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Birthday (YYYY-MM-DD)"
        placeholderTextColor="#777"
        value={birthday}
        onChangeText={setBirthday}
        style={styles.input}
      />
      <TextInput
        placeholder="Gender"
        placeholderTextColor="#777"
        value={gender}
        onChangeText={setGender}
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
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#777"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <Button title="Register" onPress={handleRegister} />

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 15}}>
        <Text style={{color: 'blue', textAlign: 'center'}}>
          Already have an account? Login
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

export default RegisterScreen;
