import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useTheme } from '../ThemeContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import RadioButton from '../components/RadioButton';
import firestore from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment'; // For date formatting

// Define the navigation prop types
type SettingsStackParamList = {
  SettingsHome: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<SettingsStackParamList, 'SettingsHome'>;

const SettingsScreen: React.FC = () => {
  const { theme, setTheme, effectiveTheme } = useTheme();
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [motivationEnabled, setMotivationEnabled] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isDevicePreference, setIsDevicePreference] = useState(theme === 'device');
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [hasSubmittedFeedback, setHasSubmittedFeedback] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  
  // Use typed navigation
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  useEffect(() => {
    // Get the unique device ID when the component mounts
    const fetchDeviceId = async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);

  useEffect(() => {
    const checkFeedbackSubmission = async () => {
      if (!deviceId) return;

      const todayDate = moment().format('YYYY-MM-DD');
      const feedbackDocs = await firestore()
        .collection('feedback')
        .where('device_id', '==', deviceId)
        .where('date', '==', todayDate)
        .get();

      if (!feedbackDocs.empty) {
        setHasSubmittedFeedback(true);
      }

      setLoading(false); // Set loading to false after checking
    };

    if (deviceId) {
      checkFeedbackSubmission();
    }
  }, [deviceId]);

  const togglePushNotifications = () => setPushNotificationsEnabled(prevState => !prevState);
  const toggleMotivation = () => setMotivationEnabled(prevState => !prevState);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setIsDevicePreference(false);
    setTheme(newTheme);
  };

  const toggleDevicePreference = () => {
    const newState = !isDevicePreference;
    setIsDevicePreference(newState);
    if (newState) {
      setTheme('device');
    }
  };

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Feedback cannot be empty');
      return;
    }

    if (!deviceId) {
      Alert.alert('Error', 'Please try again later.');
      return;
    }

    const todayDate = moment().format('YYYY-MM-DD');

    try {
      // Get the count of all feedback documents for today
      const feedbackDocs = await firestore()
        .collection('feedback')
        .where('date', '==', todayDate)
        .get();

      const feedbackCount = feedbackDocs.size + 1; // Get the next document number
      const feedbackDocId = `${feedbackCount}_${todayDate}`;

      await firestore().collection('feedback').doc(feedbackDocId).set({
        feedback_text: feedback,
        timestamp: firestore.FieldValue.serverTimestamp(),
        device_id: deviceId,
        date: todayDate,
      });
      setFeedback(''); // Clear feedback input after submission
      setHasSubmittedFeedback(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, effectiveTheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        {/* Allow Push Notifications */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            Allow Push Notifications
          </Text>
          <Switch
            value={pushNotificationsEnabled}
            onValueChange={togglePushNotifications}
          />
        </View>

        {/* Motivation */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            Motivation
          </Text>
          <Switch
            value={motivationEnabled}
            onValueChange={toggleMotivation}
          />
        </View>

        {/* Change Theme */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            Theme
          </Text>
          <View style={styles.themeOptions}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.themeLabel, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>Light</Text>
              <RadioButton
                isSelected={effectiveTheme === 'light'}
                onPress={() => handleThemeChange('light')}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.themeLabel, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>Dark</Text>
              <RadioButton
                isSelected={effectiveTheme === 'dark'}
                onPress={() => handleThemeChange('dark')}
              />
            </View>
          </View>
          <View style={styles.devicePreferenceContainer}>
            <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
              Use Device Preference
            </Text>
            <Switch
              value={isDevicePreference}
              onValueChange={toggleDevicePreference}
            />
          </View>
        </View>

        {/* Feedback Form */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            Feedback
          </Text>
          {loading ? (
            <ActivityIndicator size="small" color={effectiveTheme === 'dark' ? '#fff' : '#000'} />
          ) : !hasSubmittedFeedback ? (
            <>
              <TextInput
                style={[styles.feedbackInput, effectiveTheme === 'dark' ? styles.darkInput : styles.lightInput]}
                placeholder="Write your feedback here..."
                placeholderTextColor={effectiveTheme === 'dark' ? '#bbb' : '#999'}
                value={feedback}
                onChangeText={setFeedback}
                multiline
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={[styles.thankYouText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
              Thanks for the feedback!
            </Text>
          )}
        </View>

        {/* About and Legal */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            About and Legal
          </Text>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('TermsOfService')}>
            <Text style={[styles.linkText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('PrivacyPolicy')}>
            <Text style={[styles.linkText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rate the App */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
            Rate the App
          </Text>
          <TouchableOpacity style={styles.rateButton}>
            <Text style={styles.rateButtonText}>Rate Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#f7f7f7',
  },
  darkContainer: {
    backgroundColor: '#303030',
  },
  settingItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  devicePreferenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  lightInput: {
    backgroundColor: '#fff',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#444',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#870721',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#870721',
  },
  rateButton: {
    backgroundColor: '#870721',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
