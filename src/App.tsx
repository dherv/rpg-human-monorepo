import './App.css';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

export const App: FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
