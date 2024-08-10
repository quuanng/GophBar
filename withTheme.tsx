import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const withTheme = (WrappedComponent) => {
  return (props) => {
    const { theme } = useTheme();

    return (
      <View style={theme === 'dark' ? styles.darkContainer : styles.lightContainer}>
        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  darkContainer: {
    flex: 1,
    backgroundColor: '#333',
  },
  lightContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

export default withTheme;
