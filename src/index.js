import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import { BrowserRouter as Router } from 'react-router-dom'
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c4858',
    },
    type: 'dark',
  },
  typography: {
    fontFamily: ['Poppins', 'Open Sans'].join(','),
    h1: {
      fontFamily: 'Poppins',
    },
    h5: {
      fontSize: '0.8rem',
    },
    body1: {
      fontFamily: 'Open Sans',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
