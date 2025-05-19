// src/screens/HomeScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const currentUser = useAuthStore(state => state.currentUser);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={{padding: 20}}>
      <Text style={{fontSize: 20, marginBottom: 15}}>User Details:</Text>
      <Text>Name: {currentUser?.name}</Text>
      <Text>Email: {currentUser?.email}</Text>
      <Text>Birthday: {currentUser?.birthday}</Text>
      <Text>Gender: {currentUser?.gender}</Text>

      <Button title="Logout" onPress={handleLogout} />
      <Icon
        name="logout"
        size={30}
        color="red"
        style={{marginTop: 15}}
        onPress={handleLogout}
      />
    </View>
  );
};

export default HomeScreen;
