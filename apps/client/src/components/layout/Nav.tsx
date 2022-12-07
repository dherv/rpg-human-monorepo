import { PersonPin, SsidChart, Terrain } from '@mui/icons-material'
import { Tab, TabList, Tabs, Typography } from '@mui/joy'
import { styled, useTheme } from '@mui/joy/styles'
import { tabClasses } from '@mui/joy/Tab'
import { typographyClasses } from '@mui/joy/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { FC, SyntheticEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Nav: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'))

  const handleChange = (
    _event: SyntheticEvent<Element, Event>,
    value: string | number | boolean,
  ) => {
    if (typeof value === 'string') {
      navigate(value)
    }
  }

  const Root = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: `1px solid ${theme.colorSchemes.light.palette.divider}`,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 85,
      top: 0,
      bottom: 0,
      right: 'auto',
      borderRight: `1px solid ${theme.colorSchemes.light.palette.divider}`,
    },
  }))

  return (
    <Root>
      <Tabs
        aria-label='Icon tabs'
        defaultValue={0}
        size='lg'
        orientation={matches ? 'vertical' : 'horizontal'}
        onChange={handleChange}
        value={location.pathname.split('/')[1]}
        sx={{
          width: '100%',
          mx: 0,
        }}
      >
        <TabList
          sx={{
            bgcolor: 'transparent',
            [`& .${tabClasses.root}`]: {
              flexDirection: 'column',
              bgcolor: 'transparent',
              boxShadow: 'none',
              opacity: 0.5,
              '&:hover': {
                bgcolor: 'transparent',
              },
              [`&.${tabClasses.selected}`]: {
                color: '#000',
                opacity: 1,
                fontWeight: 'lg',
                [`& .${typographyClasses.root}`]: {
                  color: '#000',
                },
              },
            },
          }}
        >
          <Tab value='activities'>
            <Terrain />
            <Typography level='body5'>activities</Typography>
          </Tab>
          <Tab value='sessions'>
            <SsidChart />
            <Typography level='body5'>sessions</Typography>
          </Tab>
          <Tab value='character'>
            <PersonPin />
            <Typography level='body5'>character</Typography>
          </Tab>
        </TabList>
      </Tabs>
    </Root>
  )
}
