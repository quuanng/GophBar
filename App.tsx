import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import Icon from 'react-native-vector-icons/Ionicons';
import { ExploreHeader, BarsHeader, MapViewHeader, SettingsHeader } from './Headers';

enableScreens();

// Dummy data for bars
const barsData = [
  { id: '1', name: "Sally's Saloon", address: '700 SE Washington Ave, Minneapolis, MN 55414', specials: 'Happy Hour: 5-7 PM' },
  { id: '2', name: 'Blarney Pub & Grill', address: '412 14th Ave SE, Minneapolis, MN 55414', specials: '2-for-1 Cocktails: 6-8 PM' },
  { id: '3', name: 'Kollege Klub Dinkytown', address: '1301 4th St SE, Minneapolis, MN 55414', specials: 'Discount Beers: All Day' },
  { id: '4', name: 'Burrito Loco', address: '418 13th Ave SE, Minneapolis, MN 55414', specials: 'Discount Beers: All Day' },
];

function BarItem({ name, address, specials }) {
  return (
    <View style={styles.barItem}>
      <Text style={styles.barName}>{name}</Text>
      <Text style={styles.barAddress}>{address}</Text>
      <Text style={styles.barSpecials}>{specials}</Text>
    </View>
  );
}

function BarsScreen() {
  return (
    <SafeAreaView style={styles.barsContainer}>
      <FlatList
        data={barsData}
        renderItem={({ item }) => <BarItem name={item.name} address={item.address} specials={item.specials} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

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
        height: Platform.OS === 'ios' ? 120 : 100, // Adjust height as needed
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
          headerTitle: props => <ExploreHeader {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bars"
        component={BarsScreen}
        options={{
          headerTitle: props => <BarsHeader {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="beer-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map View"
        component={MapViewScreen}
        options={{
          headerTitle: props => <MapViewHeader {...props} />,
          tabBarIcon: ({ color, size }) => (
            <Icon name="navigate-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: props => <SettingsHeader {...props} />,
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
