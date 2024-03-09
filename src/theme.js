import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    badgeColor: '#c62828'
  },
  colorSchemes: {
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.main
          //   }
          // },
          '& fieldset': {
            borderWidth: '1.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '1.6px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1.6px !important'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar' : {
            height: '8px'
          },
          '*::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdbdbd',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: 'white'
          }
        }
      }
    }
  }
})

export default theme