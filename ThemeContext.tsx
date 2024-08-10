import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  effectiveTheme: string;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light',
  setTheme: () => {},
  effectiveTheme: 'light',
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState('light');
  const [effectiveTheme, setEffectiveTheme] = useState('light');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme === 'device') {
        const deviceTheme = Appearance.getColorScheme();
        setEffectiveTheme(deviceTheme || 'light');
        setTheme('device');
      } else if (savedTheme) {
        setTheme(savedTheme);
        setEffectiveTheme(savedTheme);
      } else {
        const deviceTheme = Appearance.getColorScheme();
        setEffectiveTheme(deviceTheme || 'light');
        setTheme('device');
      }
    };
    loadTheme();
  }, []);

  const handleThemeChange = async (newTheme: string) => {
    if (newTheme === 'device') {
      const deviceTheme = Appearance.getColorScheme();
      setEffectiveTheme(deviceTheme || 'light');
      setTheme('device');
      await AsyncStorage.setItem('appTheme', 'device');
    } else {
      setTheme(newTheme);
      setEffectiveTheme(newTheme);
      await AsyncStorage.setItem('appTheme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
