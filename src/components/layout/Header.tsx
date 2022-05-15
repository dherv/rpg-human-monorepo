import { FC } from 'react'
import { AppName } from './AppName'

export const Header: FC = () => {
  return (
    <header className='p-2'>
      <AppName>h.rpg</AppName>
    </header>
  )
}
