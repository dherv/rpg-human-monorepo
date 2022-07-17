import { ListItem } from '@dherv-co/barbarian-with-style'
import { format } from 'date-fns'
import { FC, useState } from 'react'
import { Session } from '../../types/types'
import { DotText } from '../base/DotText'
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

  // TODO: find a way to combine the list item to have p-2 on all (app StyledListItem extends the library one - provide a padding prop from lib?) / or a way to have a global padding

  return (
    <>
      <ListItem
        key={session.sessionId}
        className='flex items-center justify-between p-2'
        onClick={handleShowContent}
        data-cy='session-log'
      >
        <DotText text={session.activity.name} color={session.activity.color} />
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
