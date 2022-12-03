import '@fontsource/public-sans'
import { CssVarsProvider } from '@mui/joy/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import { worker } from './mocks/browser'
import { AppRouter } from './router/AppRouter'
import { theme } from './services/mui/theme'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <AppRouter />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
