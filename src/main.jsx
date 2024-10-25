import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AuthProvider } from './context/AuthContext.jsx';


const theme = createTheme({
  palette: {
    primary: {
      main: '#5DA7FB', // สีหลักของ AppBar
    },

    error: {
      main: '#FC1859'
    },

    success: {
      main: '#995DFF'
    }
  },
});

createRoot(document.getElementById('root')).render(

  <AuthProvider>
    <ThemeProvider theme={theme}>
      <StrictMode>
        <App />
      </StrictMode>
    </ThemeProvider>
  </AuthProvider>
)
