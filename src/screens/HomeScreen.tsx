import React from 'react';
import {View, Text, Button} from 'react-native';
import {useAuthStore} from '../store/authStore';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen() {
  const {user, logout} = useAuthStore();

  return (
    <View style={{flex: 1, padding: 20}}>
      <Icon name="user" size={30} color="#000" />
      <Text style={{fontSize: 24, marginVertical: 20}}>
        Welcome {user?.name}!
      </Text>
      <Text>Email: {user?.email}</Text>

      <View style={{marginTop: 20}}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
}
