import { blue, indigo } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight: '48px',
    boardBarHeight: '56px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        secondary: indigo
      }
    },
    dark: {
      palette: {
        // primary: {
        //   main: '#000'
        // }
      }
    }
  }
  //...others properties
})

export default theme