import React, { useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { selectTheme } from '../slices/themeSlice';
import { useSelector} from 'react-redux';


export const ThemeProvider = ({ children }) => {
  const theme = useSelector(selectTheme);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }, [theme]);

  const muiTheme = useMemo(() => // useMemo запам'ятовує (мемоізує) результат виконання функцій (зараз createTheme(...)). useMemo виконає createTheme тільки один раз напочатку, а потім буде виконувати її тільки тоді, коли значення в масиві залежностей [theme] зміниться
    createTheme({
      palette: {
        mode: theme === 'dark' ? 'dark' : 'light',
      },
    }), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      {children}
    </MuiThemeProvider>
  );
};