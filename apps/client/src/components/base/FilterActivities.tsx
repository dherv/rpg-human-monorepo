import { ChangeEvent, FC, useMemo } from 'react'
import { useGetActivitiesQuery } from '../../features/api/apiSlice'

interface Props {
  activity?: number
  onChange: (activity: number) => void
}

export const FilterActivities: FC<Props> = ({ activity, onChange }) => {
  const { data: activities = [] } = useGetActivitiesQuery()

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value)
    onChange(value)
  }

  const ordererdActivities = useMemo(() => {
    return activities?.slice().sort((a, b) => a.name.localeCompare(b.name))
  }, [activities])

  return (
    <select value={activity} onChange={handleChange}>
      <option value={undefined}>all</option>
      {ordererdActivities?.map((activity) => (
        <option key={activity.activityId} value={activity.activityId}>
          {activity.name}
        </option>
      ))}
    </select>
  )
}
