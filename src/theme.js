import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500]
    },
    secondary: {
      main: '#19857b'
    },
    text: {
      secondary: 'rgba(126, 255, 255, 0.4)'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme