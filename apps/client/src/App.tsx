import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import { flags } from './app/flags'
import { Layout } from './components/layout/Layout'
import { FlagsProvider } from './services/flags/FlagsProvider'

export const App: FC = () => {
  return (
    <FlagsProvider value={flags}>
      <Layout>
        <Outlet />
      </Layout>
    </FlagsProvider>
  )
}

export default App
