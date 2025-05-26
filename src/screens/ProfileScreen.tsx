import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuthStore} from '../store/authStore';
import {useTheme} from '../theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const currentUser = useAuthStore(state => state.currentUser);
  const logout = useAuthStore(state => state.logout);
  const {theme, themePreference, setThemePreference} = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const themeOptions: {label: string; value: 'system' | 'light' | 'dark'}[] = [
    {label: 'System Default', value: 'system'},
    {label: 'Light', value: 'light'},
    {label: 'Dark', value: 'dark'},
  ];

  // derive the display label for current preference
  const currentThemeLabel =
    themeOptions.find(opt => opt.value === themePreference)?.label ||
    'System Default';

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [modalVisible]);

  const handleSelectTheme = (value: 'light' | 'dark' | 'system') => {
    setThemePreference(value);
    setModalVisible(false);
  };

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

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
      borderRadius: 12,
      padding: 20,
      marginBottom: 20,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 8,
      color: theme.text,
    },
    menuButton: {
      flexDirection: 'row',
      backgroundColor: theme.cardBackground,
      padding: 14,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    menuButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    menuButtonIcon: {
      marginRight: 12,
    },
    menuButtonText: {
      color: theme.text,
      fontSize: 16,
      flex: 1,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 0,
      width: '80%',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    modalHeader: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    modalItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    modalItemText: {
      fontSize: 16,
      color: theme.text,
    },
    separator: {
      height: 1,
      backgroundColor: theme.borderColor,
      marginHorizontal: 10,
    },
    logoutButton: {
      flexDirection: 'row',
      backgroundColor: theme.error,
      borderRadius: 8,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />
      <Text style={styles.header}>Your Profile</Text>

      <View style={styles.userDetails}>
        <Icon
          name="account-circle"
          size={54}
          color={theme.text}
          style={{alignSelf: 'center', marginBottom: 12}}
        />
        <Text style={styles.detailText}>Name: {currentUser?.name}</Text>
        <Text style={styles.detailText}>Email: {currentUser?.email}</Text>
      </View>

      <TouchableOpacity
        onPress={handleEditProfile}
        style={styles.menuButton}
        activeOpacity={0.7}>
        <View style={styles.menuButtonContent}>
          <Icon
            name="edit"
            size={20}
            color={theme.text}
            style={styles.menuButtonIcon}
          />
          <Text style={styles.menuButtonText}>Edit Profile</Text>
        </View>
        <Icon name="chevron-right" size={24} color={theme.text} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.menuButton}
        activeOpacity={0.7}>
        <View style={styles.menuButtonContent}>
          <Icon
            name="palette"
            size={20}
            color={theme.text}
            style={styles.menuButtonIcon}
          />
          <Text style={styles.menuButtonText}>Theme: {currentThemeLabel}</Text>
        </View>
        <Icon name="arrow-drop-down" size={24} color={theme.text} />
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <Animated.View style={[styles.modalContent, {opacity: fadeAnim}]}>
            <Text style={styles.modalHeader}>Choose Theme</Text>
            {themeOptions.map((option, index) => (
              <React.Fragment key={option.value}>
                {index > 0 && <View style={styles.separator} />}
                <Pressable
                  android_ripple={{color: theme.borderColor}}
                  onPress={() => handleSelectTheme(option.value)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{option.label}</Text>
                  {themePreference === option.value && (
                    <Icon
                      name="check"
                      size={20}
                      color={theme.buttonBackground}
                    />
                  )}
                </Pressable>
              </React.Fragment>
            ))}
          </Animated.View>
        </Pressable>
      </Modal>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => logout()}
        activeOpacity={0.8}>
        <Text style={styles.logoutText}>Logout</Text>
        <Icon name="logout" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
