import { FC, ReactElement } from 'react';
import { Header } from './Header';
import { Nav } from './Nav';

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <Header />
      <Nav />
      <main>{children}</main>
      <footer></footer>
    </>
  );
};
