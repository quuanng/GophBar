import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

// Define the structure of your data
interface Bar {
  id: string;
  name: string;
  address: string;
  specials: string[];
}

// BarItem component to display each bar's information
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

// BarsScreen component to fetch and display all bars
const BarsScreen: React.FC = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch data from Firestore
    const unsubscribe = firestore()
      .collection('bars')
      .onSnapshot(querySnapshot => {
        const barsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Bar[];
        setBars(barsList);
        setLoading(false);
      }, error => {
        console.error("Error fetching bars data: ", error);
        setLoading(false);
      });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.barsContainer}>
      <FlatList
        data={bars}
        renderItem={({ item }) => <BarItem bar={item} />}
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

export default BarsScreen;
