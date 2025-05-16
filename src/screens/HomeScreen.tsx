import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Button from '../components/Button';
import {useAuthStore} from '../store/UseAuthStore';

const HomeScreen = () => {
  const {user, logout, isLoading} = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to HabitBuddy!</Text>
          <Text style={styles.subtitle}>
            Your personal habit tracking companion
          </Text>
        </View>

        <View style={styles.userInfoContainer}>
          <Text style={styles.sectionTitle}>User Details</Text>
          <View style={styles.userInfoCard}>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Name:</Text>
              <Text style={styles.userInfoValue}>{user?.name}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Email:</Text>
              <Text style={styles.userInfoValue}>{user?.email}</Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>User ID:</Text>
              <Text style={styles.userInfoValue}>{user?.id}</Text>
            </View>
          </View>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            You've successfully logged in! This home screen is just displaying
            your user details to confirm the authentication system works.
          </Text>
          <Text style={styles.messageText}>
            You can now proceed to implement the rest of the habit tracking
            features as per your assignment.
          </Text>
        </View>

        <Button
          title="Logout"
          onPress={handleLogout}
          isLoading={isLoading}
          style={styles.logoutButton}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  userInfoContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  userInfoCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  userInfoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    width: 80,
  },
  userInfoValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  messageContainer: {
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  logoutButton: {
    marginBottom: 20,
  },
});

export default HomeScreen;
