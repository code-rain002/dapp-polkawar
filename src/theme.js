import { createMuiTheme } from "@material-ui/core/styles";
export const theme = createMuiTheme({
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa",
    },
    primary: {
      light: "rgba(89, 210, 188, 1)",
      main: "#C80C81",
    },
    secondary: {
      light: "rgba(89, 210, 188, 1)",
      main: "#C80C81",
    },
    pbr: {
      primary: "#C80C81",
      secondary: "#f4c8dd",
      textPrimary: "#ffffff",
      textSecondary: "#bdbdbd",
      textPrimaryOpp: "#000000",
      textSecondaryOpp: "#757575",
    },
  },
  typography: {
    fontFamily: [
      "Carter One",
      "Poppins",
      "Balsamiq Sans",
      "Work Sans",
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
export default theme;
