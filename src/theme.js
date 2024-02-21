import { blue, indigo, lightBlue, pink } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: lightBlue,
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