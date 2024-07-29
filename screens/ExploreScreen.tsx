import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore Page</Text>
      <Text style={styles.subtitle}>Coming Soon</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#870721',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffdd67',
  },
});

export default ExploreScreen;