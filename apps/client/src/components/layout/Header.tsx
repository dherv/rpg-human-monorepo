import { Avatar } from '@mui/joy'
import { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className='flex justify-between p-4'>
      {/* <AppName>h.rpg</AppName> */}
      <div></div>
      <Avatar color='primary' size='sm'>
        JG
      </Avatar>
    </header>
  )
}
