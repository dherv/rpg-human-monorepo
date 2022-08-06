import { FC } from 'react'
import { List, ListItem, Title } from '@dherv/barbarian-with-style'
import { useGetActivitiesQuery } from '../../features/api/apiSlice'

export const Activities: FC<{ onClick: (activityId: number) => void }> = ({ onClick }) => {
  const { data: activities, isLoading, isError, error, isSuccess } = useGetActivitiesQuery()

  const handleSelectActivity = (activityId: number) => {
    onClick(activityId)
  }

  let content

  if (isLoading) {
    content = <p key='content-loading'>isLoading...</p>
  } else if (isSuccess) {
    content = activities?.map((activity) => (
      <ListItem key={activity.activityId} onClick={() => handleSelectActivity(activity.activityId)}>
        {activity.name}
      </ListItem>
    ))
  } else if (isError) {
    content = <div key='content'>{error?.toString()}</div>
  }

  return (
    <section className='activities-list'>
      <Title>activities</Title>
      <List>{content}</List>
    </section>
  )
}
