// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B7CAD4", 
    },
    secondary: {
      main: "#ff9800", // orange
    },
    background: {
      default: "#0E1113"
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",

    h6: {

      color: "white"
    },
    body2: {
      fontSize: "1rem",
      color: "#B7CAD4"
    },
    subtitle2: {
      color: "#B7CAD4",
      fontSize: '0.80rem'
    },
    h4: {
      color: "white"
    },
    h5: {
      color: "#B7CAD4"
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0E1113'
        },
      },
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#0E1113', 
                color: '#D7DADC',            
                boxShadow: 'none',     
                borderBottom: '1px solid #343536',     
            },
        },
    },
  }

  
});

export default theme;
