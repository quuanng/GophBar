import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { useTheme } from '../ThemeContext';

const bars = [
  { id: '1', name: 'Bar One', votes: 0 },
  { id: '2', name: 'Bar Two', votes: 0 },
  { id: '3', name: 'Bar Three', votes: 0 },
  { id: '4', name: 'Bar Four', votes: 0 },
];

const calculateTimeRemaining = () => {
  const now = new Date();
  const nextReset = new Date();
  nextReset.setHours(6, 0, 0, 0);
  if (now.getHours() >= 6) {
    nextReset.setDate(nextReset.getDate() + 1);
  }
  const timeDiff = nextReset.getTime() - now.getTime();
  const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDiff / 1000) % 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const PollScreen = () => {
  const { effectiveTheme } = useTheme();
  const [selectedBar, setSelectedBar] = useState<string | null>(null);
  const [votes, setVotes] = useState<{ [key: string]: number }>({});
  const [totalVotes, setTotalVotes] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPollData = async () => {
      const pollDoc = await firestore().collection('polls').doc('currentPoll').get();
      if (pollDoc.exists) {
        const pollData = pollDoc.data();
        const newVotes = {
          '1': pollData?.bar1?.votes || 0,
          '2': pollData?.bar2?.votes || 0,
          '3': pollData?.bar3?.votes || 0,
          '4': pollData?.bar4?.votes || 0,
        };
        const newTotalVotes = Object.values(newVotes).reduce((a, b) => a + b, 0);
        setVotes(newVotes);
        setTotalVotes(newTotalVotes);
  
        const deviceId = DeviceInfo.getUniqueId();
        const storedData = await AsyncStorage.getItem(`selectedBar_${deviceId}`);
        const lastReset = pollData?.lastReset?.toDate();
        const now = new Date();
        
        const resetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);
        if (lastReset < resetTime && now >= resetTime) {
          await resetPoll();
          return; // Exit early after reset to prevent setting old data
        }
  
        if (storedData) {
          const { barId, time } = JSON.parse(storedData);
          const storedTime = new Date(time);
  
          if (lastReset > storedTime) {
            await AsyncStorage.removeItem(`selectedBar_${deviceId}`);
            setSelectedBar(null);
            setShowResults(false);
          } else {
            setSelectedBar(barId);
            setShowResults(true);
          }
        }
      }
    };
  
    fetchPollData();
  }, []);
  

  const resetPoll = async () => {
    const pollRef = firestore().collection('polls').doc('currentPoll');
    await firestore().runTransaction(async (transaction) => {
      const pollDoc = await transaction.get(pollRef);

      if (pollDoc.exists) {
        const pollData = pollDoc.data();

        pollData.bar1.votes = 0;
        pollData.bar2.votes = 0;
        pollData.bar3.votes = 0;
        pollData.bar4.votes = 0;

        pollData.lastReset = new Date();

        transaction.update(pollRef, pollData);
      }
    });

    const deviceId = DeviceInfo.getUniqueId();
    await AsyncStorage.removeItem(`selectedBar_${deviceId}`);
    setSelectedBar(null);
    setShowResults(false);
    setVotes({ '1': 0, '2': 0, '3': 0, '4': 0 });
    setTotalVotes(0);
  };

  const handleVote = async (barId: string) => {
    const pollRef = firestore().collection('polls').doc('currentPoll');
    const deviceId = DeviceInfo.getUniqueId();
    const currentTime = new Date().toISOString();
  
    await firestore().runTransaction(async (transaction) => {
      const pollDoc = await transaction.get(pollRef);
  
      if (!pollDoc.exists) {
        throw new Error('Poll does not exist!');
      }
  
      const pollData = pollDoc.data();
  
      if (selectedBar) {
        pollData[`bar${selectedBar}`].votes -= 1;
      }
  
      pollData[`bar${barId}`].votes += 1;
  
      transaction.update(pollRef, pollData);
  
      setVotes((prevVotes) => {
        const newVotes = { ...prevVotes };
  
        if (selectedBar) {
          newVotes[selectedBar] -= 1;
        }
  
        newVotes[barId] += 1;
  
        return newVotes;
      });
  
      setTotalVotes((prevTotal) => {
        if (selectedBar) {
          return prevTotal;
        } else {
          return prevTotal + 1;
        }
      });
  
      setSelectedBar(barId);
      setShowResults(true);
  
      await AsyncStorage.setItem(`selectedBar_${deviceId}`, JSON.stringify({ barId, time: currentTime }));
    });
  };

  const renderResults = (barId: string) => {
    if (!showResults) return null;

    const voteCount = votes[barId] || 0;
    const percentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : '0.00';
    return <Text style={[styles.votePercentage, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>{percentage}%</Text>;
  };

  return (
    <SafeAreaView style={[styles.container, effectiveTheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.countdown, effectiveTheme === 'dark' ? styles.darkText : styles.lightCountdownText]}>Poll Resets in: {timeRemaining}</Text>
      <View style={[styles.pollContainer, effectiveTheme === 'dark' ? styles.darkPollContainer : styles.lightPollContainer]}>
        <Text style={styles.title}>What bar today?</Text>
        {bars.map((bar) => (
          <TouchableOpacity
            key={bar.id}
            style={[styles.barOption, effectiveTheme === 'dark' ? styles.darkPollOption : styles.lightPollOption, selectedBar === bar.id && (effectiveTheme === 'dark' ? styles.darkSelectedOption : styles.lightSelectedOption)]}
            onPress={() => handleVote(bar.id)}
          >
            <Text style={styles.barName}>{bar.name}</Text>
            {renderResults(bar.id)}
          </TouchableOpacity>
        ))}
      </View>
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
  countdown: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lightCountdownText: {
    color: '#870721',
  },
  darkCountdownText: {
    color: '#60081A',
  },
  lightPollContainer: {
    backgroundColor: '#870721',
  },
  darkPollContainer: {
    backgroundColor: '#60081A',
  },
  pollContainer: {
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fffae5',
    textAlign: 'center',
    marginBottom: 16,
  },
  barOption: {
    backgroundColor: '#A10928',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  lightPollOption: {
    backgroundColor: '#870721',
  },
  darkPollOption: {
    backgroundColor: '#60081A',
  },
  lightSelectedOption: {
    backgroundColor: '#60081A',
  },
  darkSelectedOption: {
    backgroundColor: '#3a0e16',
  },
  barName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fffae5',
  },
  votePercentage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lightText: {
    color: '#fff',
  },
  darkText: {
    color: '#d0d0d0',
  },
});

export default PollScreen;
