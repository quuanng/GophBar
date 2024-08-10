import React from 'react';
import { SafeAreaView, View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useTheme } from '../ThemeContext';

const SettingsScreen = () => {
  const { theme, setTheme } = useTheme();
  const [pushNotificationsEnabled, setPushNotificationsEnabled] = React.useState(false);
  const [motivationEnabled, setMotivationEnabled] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');

  const togglePushNotifications = () => setPushNotificationsEnabled(prevState => !prevState);
  const toggleMotivation = () => setMotivationEnabled(prevState => !prevState);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        {/* Allow Push Notifications */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Allow Push Notifications
          </Text>
          <Switch
            value={pushNotificationsEnabled}
            onValueChange={togglePushNotifications}
          />
        </View>

        {/* Motivation */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Motivation
          </Text>
          <Switch
            value={motivationEnabled}
            onValueChange={toggleMotivation}
          />
        </View>

        {/* Change Theme */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Theme
          </Text>
          <View style={styles.themeOptions}>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'light' && styles.selectedOption]}
              onPress={() => setTheme('light')}
            >
              <Text style={styles.themeText}>Light</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'dark' && styles.selectedOption]}
              onPress={() => setTheme('dark')}
            >
              <Text style={styles.themeText}>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.themeOption, theme === 'device' && styles.selectedOption]}
              onPress={() => setTheme('device')}
            >
              <Text style={styles.themeText}>Device Preference</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feedback Form */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
            Feedback
          </Text>
          <TextInput
            style={[styles.feedbackInput, theme === 'dark' ? styles.darkInput : styles.lightInput]}
            placeholder="Write your feedback here..."
            placeholderTextColor={theme === 'dark' ? '#bbb' : '#999'}
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
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
            About and Legal
          </Text>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={[styles.linkText, theme === 'dark' ? styles.darkText : styles.lightText]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={[styles.linkText, theme === 'dark' ? styles.darkText : styles.lightText]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rate the App */}
        <View style={styles.settingItem}>
          <Text style={[styles.settingText, theme === 'dark' ? styles.darkText : styles.lightText]}>
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
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
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
