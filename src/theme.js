import { createMuiTheme } from '@material-ui/core/styles';
export const theme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: 'rgba(89, 210, 188, 1)',
      main: '#C80C81',
    },
    secondary: {
      light: 'rgba(89, 210, 188, 1)',
      main: '#C80C81',
    },
    pbr: {
      primary: '#C80C81',
      secondary: '#f4c8dd',
      textPrimary: '#000000',
      textSecondary: '#757575',
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Work Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
export default theme;
