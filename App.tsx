// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { ExploreHeader, BarsHeader, PollHeader, SettingsHeader } from './Headers';
import { ThemeProvider, useTheme } from './ThemeContext';
import ExploreScreen from './screens/ExploreScreen';
import BarsScreen from './screens/BarsScreen';
import PollScreen from './screens/PollScreen';
import SettingsScreen from './screens/SettingsScreen';

enableScreens();

const Tab = createBottomTabNavigator();

function MainTabs() {
  const { effectiveTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#870721',
        tabBarInactiveTintColor: effectiveTheme === 'dark' ? '#999' : 'grey',
        tabBarStyle: {
          backgroundColor: effectiveTheme === 'dark' ? '#282828' : '#eeeeee',
        },
        headerStyle: {
          backgroundColor: effectiveTheme === 'dark' ? '#282828' : '#eeeeee',
          height: Platform.OS === 'ios' ? 140 : 90,
        },
        headerTintColor: '#870721',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          headerTitle: () => <ExploreHeader />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bars"
        component={BarsScreen}
        options={{
          headerTitle: () => <BarsHeader />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="beer-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Poll"
        component={PollScreen}
        options={{
          headerTitle: () => <PollHeader />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: () => <SettingsHeader />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="cog-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <MainTabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
