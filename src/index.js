import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import indigo from '@material-ui/core/colors/indigo'

import { BrowserRouter as Router } from 'react-router-dom'
const theme = createMuiTheme({
  palette: {
    primary: indigo,
  },
})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
