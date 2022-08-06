import { FC, useState } from 'react'
import { Activities } from './Activities'
import { ActivityAddForm } from './ActivityAddForm'

export const ActivityContainer: FC = () => {
  const [_selectedActivityId, setSelectedActivityId] = useState<number>()
  const handleClick = (activityId: number) => setSelectedActivityId(activityId)

  return (
    <section>
      <Activities onClick={handleClick} />
      <ActivityAddForm />
    </section>
  )
}
