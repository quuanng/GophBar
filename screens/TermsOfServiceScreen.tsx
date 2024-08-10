import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const TermsOfServiceScreen: React.FC = () => {
  const { effectiveTheme } = useTheme();

  return (
    <SafeAreaView style={effectiveTheme === 'dark' ? styles.darkContainer : styles.lightContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={[styles.titleText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          GophBar Terms of Service
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          1. Introduction
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Welcome to GophBar! These Terms of Service ("Terms") govern your use of the GophBar mobile application ("App")
          operated by Quang Pham ("I," "me," or "my"). By accessing or using my App, you agree to these Terms. If you do
          not agree to these Terms, please do not use my App.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          2. Eligibility
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          You must be at least 21 years old to use my App. By using the App, you represent and warrant that you are at
          least 21 years old.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3. User Responsibilities
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.1. Compliance: You agree to use the App in compliance with all applicable laws, regulations, and these Terms.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          3.2. Prohibited Conduct: You agree not to:
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          • Use the App for any illegal or unauthorized purpose.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          • Post, upload, or distribute any content that is defamatory, obscene, offensive, or otherwise inappropriate.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          • Interfere with or disrupt the operation of the App, including transmitting any viruses, malware, or harmful
          code.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          • Attempt to gain unauthorized access to the App or other users' accounts.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          4. Content and Intellectual Property
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          4.1. Ownership: All content, features, and functionality of the App, including but not limited to text,
          graphics, logos, and software, are my property or the property of my licensors and are protected by
          intellectual property laws.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          4.2. License: I grant you a limited, non-exclusive, non-transferable, and revocable license to use the App for
          personal, non-commercial purposes in accordance with these Terms.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          4.3. User-Generated Content: If you submit any content (e.g., reviews, ratings) to the App, you grant me a
          non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, reproduce, and distribute such
          content in connection with the operation of the App.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          5. Privacy
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          Your use of the App is also governed by my Privacy Policy, which outlines how I collect, use, and protect your
          personal information. Please review the Privacy Policy to understand my practices.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6. Limitation of Liability
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6.1. Disclaimer: The App is provided "as is" and "as available" without any warranties, express or implied. I
          do not warrant that the App will be error-free, secure, or operate without interruption.
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          6.2. Limitation: To the fullest extent permitted by law, I shall not be liable for any direct, indirect,
          incidental, consequential, or punitive damages arising out of or related to your use of the App, even if I have
          been advised of the possibility of such damages.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          7. Termination
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          I reserve the right to terminate or suspend your access to the App at any time, with or without cause or
          notice, including for any violation of these Terms.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          8. Changes to Terms
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          I may modify these Terms at any time by posting the updated Terms on the App. Your continued use of the App
          after any changes constitutes your acceptance of the new Terms.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          9. Governing Law
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          These Terms are governed by and construed in accordance with the laws of Minnesota, without regard to its
          conflict of law principles.
        </Text>

        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          10. Contact Information
        </Text>
        <Text style={[styles.bodyText, effectiveTheme === 'dark' ? styles.darkText : styles.lightText]}>
          If you have any questions or concerns about these Terms, please contact me at pham0327@umn.edu.
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

export default TermsOfServiceScreen;
