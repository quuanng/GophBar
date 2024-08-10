import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from './ThemeContext';
import SettingsScreen from './screens/SettingsScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

const SettingsStackNavigator: React.FC = () => {
  const { effectiveTheme } = useTheme();

  // Define header styles based on the theme
  const headerBackgroundColor = effectiveTheme === 'dark' ? '#303030' : '#eeeeee';
  const headerTextColor = effectiveTheme === 'dark' ? '#ffffff' : '#000000';

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{ 
          headerShown: false,
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: headerBackgroundColor, // Dynamic background color
          },
          headerTintColor: headerTextColor, // Dynamic text color for the title and back button
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: headerTextColor, // Dynamic title text color
          },
          headerTitleAlign: 'center', // Center align the title
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: headerBackgroundColor, // Dynamic background color
          },
          headerTintColor: headerTextColor, // Dynamic text color for the title and back button
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: headerTextColor, // Dynamic title text color
          },
          headerTitleAlign: 'center', // Center align the title
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
