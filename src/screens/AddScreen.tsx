// src/screens/AddScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddScreen = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: theme.text + '80',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      <Icon
        name="add-circle"
        size={64}
        color={theme.buttonBackground}
        style={styles.icon}
      />
      <Text style={styles.title}>Add New</Text>
      <Text style={styles.subtitle}>Create new habits or challenges</Text>
    </View>
  );
};

export default AddScreen;
