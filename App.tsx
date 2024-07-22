// App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { ExploreHeader, BarsHeader, MapViewHeader, SettingsHeader } from './Headers';
import BarsScreen from './BarsScreen';

enableScreens();

interface Bar {
  id: string;
  name: string;
  address: string;
  specials: string[];
}

const BarItem: React.FC<{ bar: Bar }> = ({ bar }) => {
  const { name, address, specials } = bar;
  return (
    <View style={styles.barItem}>
      <Text style={styles.barName}>{name}</Text>
      <Text style={styles.barAddress}>{address}</Text>
      {specials.map((special, index) => (
        <Text key={index} style={styles.barSpecials}>{special}</Text>
      ))}
    </View>
  );
};

function ExploreScreen() {
  return (
    <View style={styles.exploreContainer}>
      <Text>Explore!</Text>
    </View>
  );
}

function MapViewScreen() {
  return (
    <View style={styles.mapViewContainer}>
      <Text>Map View!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.settingsContainer}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#870721', // Active tab color
        tabBarInactiveTintColor: 'grey', // Inactive tab color
        tabBarStyle: { backgroundColor: '#eeeeee' }, // Tab bar background color
        headerStyle: {
          backgroundColor: '#eeeeee', // Header background color
          height: Platform.OS === 'ios' ? 140 : 90, // Adjust height as needed
        },
        headerTintColor: '#870721', // Header text color
        headerTitleStyle: { fontWeight: 'bold' }, // Header title style
        headerTitleAlign: 'center', // Center the header title
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
        name="Map View"
        component={MapViewScreen}
        options={{
          headerTitle: () => <MapViewHeader />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="navigate-circle-outline" color={color} size={size} />
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
  barsContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Screen background color
  },
  exploreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Screen background color
  },
  mapViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Screen background color
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Screen background color
  },
  barItem: {
    backgroundColor: '#870721',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    // Shadow properties for both iOS and Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // For Android:
    elevation: 4,
  },
  barName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fffae5',
  },
  barAddress: {
    fontSize: 14,
    color: '#dad6c6',
  },
  barSpecials: {
    fontSize: 14,
    color: '#dad6c6',
  },
});

export default App;
