import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const ExploreScreen = () => {
  const { effectiveTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, effectiveTheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, effectiveTheme === 'dark' ? styles.darkTitle : styles.lightTitle]}>Explore Page</Text>
      <Text style={[styles.subtitle, effectiveTheme === 'dark' ? styles.darkSubtitle : styles.lightSubtitle]}>Coming Soon</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightContainer: {
    backgroundColor: '#f7f7f7',
  },
  darkContainer: {
    backgroundColor: '#303030',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  lightTitle: {
    color: '#870721',
  },
  darkTitle: {
    color: '#ffdd67',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  lightSubtitle: {
    color: '#ffdd67',
  },
  darkSubtitle: {
    color: '#870721',
  },
});

export default ExploreScreen;
