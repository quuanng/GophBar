import React, { useState } from 'react';
import { SafeAreaView, View, Text, Switch, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = useState(false);
  const [motivationEnabled, setMotivationEnabled] = useState(false);
  const [theme, setTheme] = useState('device'); // 'light', 'dark', or 'device'
  const [feedback, setFeedback] = useState('');

  const togglePushNotifications = () => setPushNotificationsEnabled(previousState => !previousState);
  const toggleMotivation = () => setMotivationEnabled(previousState => !previousState);

  const handleThemeChange = (newTheme: string) => setTheme(newTheme);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Allow Push Notifications */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Allow Push Notifications</Text>
          <Switch
            value={pushNotificationsEnabled}
            onValueChange={togglePushNotifications}
          />
        </View>

        {/* Motivation */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Motivation</Text>
          <Switch
            value={motivationEnabled}
            onValueChange={toggleMotivation}
          />
        </View>

        {/* Change Theme */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Theme</Text>
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'light' && styles.selectedOption]}
              onPress={() => handleThemeChange('light')}
            >
              <Text style={styles.themeText}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'dark' && styles.selectedOption]}
              onPress={() => handleThemeChange('dark')}
            >
              <Text style={styles.themeText}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'device' && styles.selectedOption]}
              onPress={() => handleThemeChange('device')}
            >
              <Text style={styles.themeText}>Device Preference</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback Form */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Feedback</Text>
          <TextInput
            style={styles.feedbackInput}
            placeholder="Write your feedback here..."
            value={feedback}
            onChangeText={setFeedback}
            multiline
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>

        {/* About and Legal */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>About and Legal</Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Rate the App */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Rate the App</Text>
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
    backgroundColor: '#f7f7f7',
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
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  themeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  selectedOption: {
    borderColor: '#870721',
    backgroundColor: '#fddde6',
  },
  themeText: {
    fontSize: 16,
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