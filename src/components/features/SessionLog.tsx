import { format } from 'date-fns'
import { FC, useState } from 'react'
import { ListItem } from '@dherv/barbarian-with-style'
import { Session } from '../../types/types'
import { Dot } from '../base/Dot'
import { SessionLogDetail } from './SessionLogDetail'

interface Props {
  session: Session
}

export const SessionLog: FC<Props> = ({ session }) => {
  const [showContent, setShowContent] = useState<boolean>(false)
  // FIXME: make accordion in css library
  const handleShowContent = () => setShowContent((prev) => !prev)

  const hasContent = Object.entries(session).some(([key, value]) => {
    if (['improvment', 'proud', 'note', 'newSkill'].includes(key)) {
      return value
    }
    return false
  })

  return (
    <>
      <ListItem
        key={session.sessionId}
        className='flex items-center justify-between p-2'
        onClick={handleShowContent}
      >
        <div className='flex items-center'>
          <Dot color='blue' />
          <p className='mx-2'>{session.activity?.name}</p>
        </div>
        <p>{format(new Date(session.date), 'MM/dd/yyyy')}</p>
      </ListItem>
      {showContent ? (
        hasContent ? (
          <ul className='p-2'>
            <SessionLogDetail title={'note'} content={session.note} />
            <SessionLogDetail title={'improvement'} content={session.improvement} />
            <SessionLogDetail title={'proud'} content={session.proud} />
            <SessionLogDetail title={'proud'} content={session.proud} />
          </ul>
        ) : (
          <div className='p-2'>no content</div>
        )
      ) : null}
    </>
  )
}
