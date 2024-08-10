import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useTheme } from '../ThemeContext';

interface Bar {
  id: string;
  name: string;
  address: string;
  happyHour: string;
  hours?: {
    open: string;
    close: string;
  };
  specials: { [key: string]: string[] };
  menu: { name: string; price: string }[];
}

const getDayOfWeek = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const currentDayIndex = new Date().getDay();
  return days[currentDayIndex];
};

const isOpen = (open: string, close: string) => {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const [openHours, openMinutes] = open.split(':').map(Number);
  const [closeHours, closeMinutes] = close.split(':').map(Number);

  const currentTimeMinutes = currentHours * 60 + currentMinutes;
  const openTimeMinutes = openHours * 60 + openMinutes;
  const closeTimeMinutes = closeHours * 60 + closeMinutes;

  if (closeTimeMinutes < openTimeMinutes) {
    return currentTimeMinutes >= openTimeMinutes || currentTimeMinutes < closeTimeMinutes;
  } else {
    return currentTimeMinutes >= openTimeMinutes && currentTimeMinutes < closeTimeMinutes;
  }
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
};

const BarsScreen: React.FC = () => {
  const { theme } = useTheme();
  const [bars, setBars] = useState<Bar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [expandedBars, setExpandedBars] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
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
              happyHour: data.happyHour,
              hours: data.hours || { open: '', close: '' },
              specials: data.specials || {},
              menu: data.menu || []
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

    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
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
      <SafeAreaView style={[styles.loadingContainer, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
        <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.loadingContainer, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
        <Text style={theme === 'dark' ? styles.darkText : styles.lightText}>{error}</Text>
      </SafeAreaView>
    );
  }

  const dayOfWeek = getDayOfWeek();

  return (
    <SafeAreaView style={[styles.barsContainer, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <FlatList
        data={bars}
        renderItem={({ item }) => (
          <BarItem
            bar={item}
            currentTime={currentTime}
            onPress={() => handlePressBarItem(item.id)}
            expanded={!!expandedBars[item.id]}
            dayOfWeek={dayOfWeek}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const BarItem: React.FC<{ bar: Bar; currentTime: Date; onPress: () => void; expanded: boolean; dayOfWeek: string }> = ({ bar, currentTime, onPress, expanded, dayOfWeek }) => {
  const { theme } = useTheme();
  const { name, address, happyHour, hours, specials, menu } = bar;
  const barIsOpen = hours ? isOpen(hours.open, hours.close) : false;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.barItem, theme === 'dark' ? styles.darkBarItem : styles.lightBarItem]} activeOpacity={0.8}>
      <View style={styles.barInfo}>
        <Text style={[styles.barName, theme === 'dark' ? styles.darkText : styles.lightText]}>{name}</Text>
        <Text style={[styles.barAddress, theme === 'dark' ? styles.darkText : styles.lightText]}>{address}</Text>
        <Text style={[styles.barHappyHour, theme === 'dark' ? styles.darkText : styles.lightText]}>Happy Hour: {happyHour}</Text>
        {hours && (
          <Text style={[styles.barHours, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Hours: {formatTime(hours.open)} - {formatTime(hours.close)}
          </Text>
        )}
      </View>
      <Image
        source={barIsOpen ? require('../pngs/open.png') : require('../pngs/closed.png')}
        style={styles.statusImage}
      />
      {expanded && (
        <View style={[styles.expandedInfo, theme === 'dark' ? styles.darkExpandedInfo : styles.lightExpandedInfo]}>
          <Text style={[styles.sectionHeader, theme === 'dark' ? styles.darkText : styles.lightText]}>Specials</Text>
          {specials[dayOfWeek] && specials[dayOfWeek].length > 0 ? (
            specials[dayOfWeek].map((special, index) => (
              <Text key={index} style={[styles.specialItemText, theme === 'dark' ? styles.darkText : styles.lightText]}>{special}</Text>
            ))
          ) : (
            <Text style={[styles.noSpecialsText, theme === 'dark' ? styles.darkText : styles.lightText]}>No specials today.</Text>
          )}
          <Text style={[styles.sectionHeader, theme === 'dark' ? styles.darkText : styles.lightText]}>Menu Suggestion of the Week</Text>
          {menu.map((item, index) => (
            <Text key={index} style={[styles.menuItemText, theme === 'dark' ? styles.darkText : styles.lightText]}>{item.name} - {item.price}</Text>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  barsContainer: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f7f7f7',
  },
  darkContainer: {
    backgroundColor: '#303030',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightText: {
    color: '#fff',
  },
  darkText: {
    color: '#d0d0d0',
  },
  barItem: {
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
  lightBarItem: {
    backgroundColor: '#870721',
  },
  darkBarItem: {
    backgroundColor: '#60081A',
  },
  barInfo: {
    flex: 1,
  },
  barName: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
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
    top: 1,
    right: 10,
  },
  expandedInfo: {
    marginTop: 10,
    borderRadius: 5,
    padding: 10,
  },
  lightExpandedInfo: {
    backgroundColor: '#60081A',
  },
  darkExpandedInfo: {
    backgroundColor: '#3a0e16',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  specialItemText: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5,
  },
  noSpecialsText: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5,
  },
});

export default BarsScreen;
