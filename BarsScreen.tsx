import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// Define the structure of your data
interface Bar {
  id: string;
  name: string;
  address: string;
  happyHour: string; // Changed from specials array to happyHour string
  hours?: {
    open: string;
    close: string;
  };
}

// Utility function to check if the bar is open
const isOpen = (open: string, close: string) => {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const [openHours, openMinutes] = open.split(':').map(Number);
  const [closeHours, closeMinutes] = close.split(':').map(Number);

  const currentTimeMinutes = currentHours * 60 + currentMinutes;
  const openTimeMinutes = openHours * 60 + openMinutes;
  const closeTimeMinutes = closeHours * 60 + closeMinutes;

  return currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;
};

// Dummy specials
const dummySpecials = [
  "Happy Hour: 5pm - 7pm",
  "Buy 1 Get 1 Free Cocktails",
  "50% off Appetizers",
  "Live Music Fridays"
];

// Dummy menu items
const dummyMenuItems = [
  { name: "Burger", price: "$10" },
  { name: "Fries", price: "$5" },
  { name: "Beer", price: "$8" },
  { name: "Cocktail", price: "$12" },
];

// BarItem component to display each bar's information
const BarItem: React.FC<{ bar: Bar; currentTime: Date; onPress: () => void; expanded: boolean }> = ({ bar, currentTime, onPress, expanded }) => {
  const { name, address, happyHour, hours } = bar;
  const barIsOpen = hours ? isOpen(hours.open, hours.close) : false;

  return (
    <TouchableOpacity onPress={onPress} style={styles.barItem} activeOpacity={0.8}>
      <View style={styles.barInfo}>
        <Text style={styles.barName}>{name}</Text>
        <Text style={styles.barAddress}>{address}</Text>
        <Text style={styles.barHappyHour}>Happy Hour: {happyHour}</Text>
        {hours && (
          <Text style={styles.barHours}>
            Hours: {hours.open} - {hours.close}
          </Text>
        )}
      </View>
      <Image
        source={barIsOpen ? require('./pngs/open.png') : require('./pngs/closed.png')}
        style={styles.statusImage}
      />
      {expanded && (
        <View style={styles.expandedInfo}>
          <Text style={styles.sectionHeader}>Specials</Text>
          {dummySpecials.map((special, index) => (
            <Text key={index} style={styles.specialItemText}>{special}</Text>
          ))}
          <Text style={styles.sectionHeader}>Menu</Text>
          {dummyMenuItems.map((item, index) => (
            <Text key={index} style={styles.menuItemText}>{item.name} - {item.price}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

// BarsScreen component to fetch and display all bars
const BarsScreen: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedBars, setExpandedBars] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Function to fetch data from Firestore
    const unsubscribe = firestore()
      .collection('bars')
      .onSnapshot(
        querySnapshot => {
          const barsList = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              address: data.address,
              happyHour: data.happyHour, // Changed from specials to happyHour
              hours: data.hours || { open: '', close: '' }, // Fallback if hours is undefined
            } as Bar;
          });
          setBars(barsList);
          setLoading(false);
        },
        error => {
          console.error("Error fetching bars data: ", error);
          setError("Error fetching data. Please try again later.");
          setLoading(false);
        }
      );

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Update the current time whenever the screen gains focus
      setCurrentTime(new Date());
    }, [])
  );

  const handlePressBarItem = (id: string) => {
    setExpandedBars(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.barsContainer}>
      <FlatList
        data={bars}
        renderItem={({ item }) => (
          <BarItem
            bar={item}
            currentTime={currentTime}
            onPress={() => handlePressBarItem(item.id)}
            expanded={!!expandedBars[item.id]}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  barsContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barItem: {
    backgroundColor: '#870721',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    position: 'relative',
  },
  barInfo: {
    flex: 1,
  },
  barName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fffae5',
  },
  barAddress: {
    fontSize: 12,
    color: '#dad6c6',
  },
  barHappyHour: {
    fontSize: 12,
    color: '#dad6c6',
  },
  barHours: {
    fontSize: 12,
    color: '#dad6c6',
    marginTop: 10,
  },
  statusImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  expandedInfo: {
    marginTop: 10,
    backgroundColor: "#60081A",
    borderRadius: 5,
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#ffdd67',
    fontWeight: '600',
    marginBottom: 5,
  },
  specialItemText: {
    fontSize: 16,
    color: '#fffae5',
    fontWeight: '300',
    marginBottom: 5,
  },
  menuItemText: {
    fontSize: 16,
    color: '#fffae5',
    fontWeight: '300',
    marginBottom: 5,
  },
});

export default BarsScreen;