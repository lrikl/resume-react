import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();
const STORAGE_THEME_KEY = 'RESUME_THEME';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem(STORAGE_THEME_KEY)) || 'light');

  useEffect(() => {
    localStorage.setItem(STORAGE_THEME_KEY, JSON.stringify(theme));
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const muiTheme = useMemo(() =>
    createTheme({
      palette: {
        mode: theme === 'dark' ? 'dark' : 'light',
      },
    }), [theme]);

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);