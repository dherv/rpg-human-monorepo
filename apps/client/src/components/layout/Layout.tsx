import { Stack } from '@dherv-co/barbarian-with-style'
import { FC, ReactElement } from 'react'
import { Header } from './Header'
import { Nav } from './Nav'

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <Stack spacing={3}>
      <Header />
      <Nav />
      <main>{children}</main>
      <footer></footer>
    </Stack>
  )
}
