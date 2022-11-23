import { Stack } from '@mui/joy'
import { useTheme } from '@mui/joy/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, ReactElement } from 'react'
import { Header } from './Header'
import { Nav } from './Nav'

export const Layout: FC<{ children: ReactElement }> = ({ children }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Stack spacing={3}>
      <div>
        <Nav />
        {/* TODO: check how to get the proper width instead of hard code */}
        <div style={{ marginLeft: matches ? 85 : 0 }}>
          <Header />
          <main className='py-4 px-8'>{children}</main>
        </div>
      </div>
      <footer></footer>
    </Stack>
  )
}
