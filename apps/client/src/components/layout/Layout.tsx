import { FC, ReactElement } from 'react'
import { Stack } from '@dherv/barbarian-with-style'
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
