import { FC } from 'react'
import { Dot } from './Dot'

interface Props {
  text: string
  color: string
}

export const DotText: FC<Props> = ({ text, color }) => {
  return (
    <div className='flex items-center'>
      <Dot color={color} />
      <p className='mx-2'>{text}</p>
    </div>
  )
}
