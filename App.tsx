// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { ExploreHeader, BarsHeader, PollHeader, SettingsHeader } from './Headers';
import ExploreScreen from './screens/ExploreScreen';
import BarsScreen from './screens/BarsScreen';
import PollScreen from './screens/PollScreen';
import SettingsScreen from './screens/SettingsScreen';

enableScreens();

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#870721',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: { backgroundColor: '#eeeeee' },
        headerStyle: {
          backgroundColor: '#eeeeee',
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
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  exploreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default App;