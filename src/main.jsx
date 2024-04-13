import ReactDOM from 'react-dom/client'
import App from '~/App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ConfirmProvider } from 'material-ui-confirm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: 'xs' },
        cancellationButtonProps: { color: 'inherit' },
        confirmationButtonProps: { variant: 'outlined', color: 'warning' }
      }}>
        <CssBaseline />
        <App />
        <ToastContainer position='bottom-left' theme='colored' autoClose={2000}/>
      </ConfirmProvider>
    </CssVarsProvider>
  </>
)
