import { List, ListItem } from '@dherv-co/barbarian-with-style'
import { FC } from 'react'
import { useGetActivitiesQuery } from '../../features/api/apiSlice'
import { DotText } from './DotText'

export const Activities: FC<{ onClick: (activityId: number) => void }> = ({ onClick }) => {
  const { data: activities, isLoading, isError, error } = useGetActivitiesQuery()

  const handleSelectActivity = (activityId: number) => {
    onClick(activityId)
  }

  if (isLoading) {
    return <p key='content-loading'>isLoading...</p>
  } else if (isError) {
    return <div key='content'>{error?.toString()}</div>
  }

  return (
    <section className='activities-list'>
      <List>
        {activities?.map((activity) => (
          <ListItem
            key={activity.activityId}
            className='p-2'
            onClick={() => handleSelectActivity(activity.activityId)}
          >
            <DotText text={activity.name} color={activity.color} />
          </ListItem>
        ))}
      </List>
    </section>
  )
}
