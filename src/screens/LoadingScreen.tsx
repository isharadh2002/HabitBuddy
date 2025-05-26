// src/screens/LoadingScreen.tsx
import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import {useTheme} from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const LoadingScreen = () => {
  const {theme} = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation animation
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
    );
    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [fadeAnim, scaleAnim, rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoContainer: {
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      height: 120,
      marginBottom: 30,
    },
    iconContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.buttonBackground,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 2,
    },
    loadingSpinner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: theme.buttonBackground + '30',
      borderTopColor: theme.buttonBackground,
      zIndex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: theme.text + '80',
      textAlign: 'center',
      marginBottom: 30,
    },
    loadingText: {
      fontSize: 14,
      color: theme.text + '70',
      textAlign: 'center',
    },
    dots: {
      flexDirection: 'row',
      marginTop: 20,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.buttonBackground,
      marginHorizontal: 3,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.statusBarBackground}
        barStyle={theme.statusBarStyle}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{scale: scaleAnim}],
          },
        ]}>
        <View style={styles.logoContainer}>
          <Animated.View
            style={[styles.loadingSpinner, {transform: [{rotate: spin}]}]}
          />
          <View style={styles.iconContainer}>
            <Icon name="self-improvement" size={40} color="white" />
          </View>
        </View>

        <Text style={styles.title}>Habit Tracker</Text>
        <Text style={styles.subtitle}>
          Building better habits, one day at a time
        </Text>

        <Text style={styles.loadingText}>Loading your progress...</Text>

        <View style={styles.dots}>
          <Animated.View style={[styles.dot, {opacity: 0.3}]} />
          <Animated.View style={[styles.dot, {opacity: 0.6}]} />
          <Animated.View style={[styles.dot, {opacity: 1}]} />
        </View>
      </Animated.View>
    </View>
  );
};

export default LoadingScreen;
