import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

type Theme = 'light' | 'dark' | 'device';

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'device',
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('device');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('appTheme');
      if (savedTheme) {
        setThemeState(savedTheme as Theme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setThemeState(systemTheme as Theme);
      }
    };

    loadTheme();

    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme === 'device') {
        setThemeState(colorScheme as Theme);
      }
    });

    return () => listener.remove();
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
