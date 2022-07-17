import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import { worker } from './mocks/browser'
import { AppRouter } from './router/AppRouter'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
