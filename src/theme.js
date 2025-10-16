// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#ffa726',
    },
  },
  typography: {
    h6: {
      fontSize: '1.3rem',
    },
    fontFamily: 'Lora',
    fontSize: 13,
  },
});
