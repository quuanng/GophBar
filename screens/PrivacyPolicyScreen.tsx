import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const PrivacyPolicyScreen: React.FC = () => {
  const { effectiveTheme } = useTheme();

  return (
    <SafeAreaView style={effectiveTheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.titleText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          GophBar Privacy Policy
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          1. Introduction
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Welcome to GophBar! This Privacy Policy explains how I, Quang Pham ("I," "me," or "my"), collect, use, disclose,
          and safeguard your information when you use the GophBar mobile application ("App"). Please read this Privacy Policy
          carefully. If you do not agree with the terms of this Privacy Policy, please do not access the App.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          2. Information I Collect
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          At this time, I do not actively collect any personal information through the App. The only information collected may
          come from user-initiated actions, such as providing feedback through the feedback section.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          2.1. Feedback Information:
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Feedback Section: If you choose to provide feedback through the App, I may collect the information you provide in your
          feedback (e.g., comments, suggestions). This information is used solely for the purpose of improving the App and
          addressing any issues you report.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          2.2. Non-Personal Information:
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Device Information: The App may use the React Native Device Info library to collect non-personal information about
          your device, such as the device model, operating system version, and other technical details. This information is used
          for analytics and improving the App's performance.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          2.3. Poll Participation:
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Poll Data: When you participate in polls within the App, your responses are collected. These responses are typically
          anonymous and are used to aggregate data for displaying poll results. No personal information is linked to your poll
          participation.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3. How I Use Your Information
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Any information collected through the feedback section or device information is used for the following purposes:
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.1. To improve and personalize the user experience.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.2. To monitor and analyze usage and trends to enhance the App’s functionality.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.3. To respond to your inquiries, comments, or requests made through the feedback section.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.4. To aggregate and display poll results within the App.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          4. Sharing Your Information
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          I do not sell, trade, or rent your personal information to third parties. The information collected is used solely for
          the purposes mentioned above and is not shared with any third parties, except as necessary to comply with legal
          obligations.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          5. Data Security
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          I take reasonable measures to protect any information you provide through the feedback section or that is collected via
          the React Native Device Info library. However, please be aware that no method of transmission over the Internet or
          method of electronic storage is completely secure.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6. Your Choices
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6.1. Feedback: You are not required to provide feedback, and doing so is entirely voluntary.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6.2. Access and Correction: If you have provided feedback and wish to update or delete that information, you may
          contact me directly at pham0327@umn.edu.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          7. Children’s Privacy
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          The App is intended for users who are 21 years of age or older, as stated in the Terms of Service. I do not knowingly
          collect personal information from anyone under the age of 21. If I become aware that I have collected personal
          information from someone under 21, I will take steps to delete such information.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          8. Changes to This Privacy Policy
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          I may update this Privacy Policy from time to time. When I do, I will post the updated Privacy Policy within the App
          and update the “Last Updated” date at the top of this document. Your continued use of the App after any changes to this
          Privacy Policy constitutes your acceptance of the updated terms.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          9. Contact Information
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          If you have any questions or concerns about this Privacy Policy, please contact me at pham0327@umn.edu.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#303030',
  },
  contentContainer: {
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 10,
  },
  lightText: {
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
});

export default PrivacyPolicyScreen;
