import React, {useState} from 'react';
import {View, TextInput, Button, Pressable, Text} from 'react-native';
import {useAuthStore} from '../store/authStore';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const {login, register} = useAuthStore();

  const handleAuth = async () => {
    if (isLogin) {
      await login(email, password);
    } else {
      await register({email, name, password});
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <Text style={{fontSize: 24, marginBottom: 20}}>
        {isLogin ? 'Login' : 'Register'}
      </Text>

      {!isLogin && (
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{borderWidth: 1, padding: 10, marginBottom: 10}}
        />
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{borderWidth: 1, padding: 10, marginBottom: 10}}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth: 1, padding: 10, marginBottom: 20}}
      />

      <Button title={isLogin ? 'Login' : 'Register'} onPress={handleAuth} />

      <Pressable onPress={() => setIsLogin(!isLogin)} style={{marginTop: 20}}>
        <Text style={{color: 'blue'}}>
          {isLogin ? 'Create new account' : 'Already have an account? Login'}
        </Text>
      </Pressable>
    </View>
  );
}
