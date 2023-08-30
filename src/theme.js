import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2', // Customize your primary color
    },
    secondary: {
      main: '#FFA726', // Customize your secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  spacing: 4, // Customize your spacing unit
});

export default theme;
