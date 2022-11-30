import { FormControl } from '@mui/joy'
import FormLabel from '@mui/joy/FormLabel'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import { FC, useMemo } from 'react'
import { useGetActivitiesQuery } from '../../features/api/apiSlice'
import { SelectEvent } from '../features/session/SessionsFilters'

interface Props {
  activity?: number
  onChange: (event: SelectEvent, value: number | null) => void
}

export const FilterActivities: FC<Props> = ({ activity, onChange }) => {
  const { data: activities = [] } = useGetActivitiesQuery()

  const ordererdActivities = useMemo(() => {
    return activities?.slice().sort((a, b) => a.name.localeCompare(b.name))
  }, [activities])

  return (
    <FormControl sx={{ minWidth: 240 }}>
      <FormLabel id='activity' htmlFor='activity-button'>
        activity
      </FormLabel>
      <Select
        // TODO: add test, can not be undefined or gives empty string, needs to be null but then undefined when setting it
        defaultValue={activity ?? null}
        name='activity'
        onChange={onChange}
        componentsProps={{
          button: {
            id: 'activity-button',
            // TODO: Material UI set aria-labelledby correctly & automatically
            // but MUI Base and Joy UI don't yet.
            'aria-labelledby': 'activity-label activity-button',
          },
        }}
      >
        <Option value={null}>all</Option>
        {ordererdActivities?.map((activity) => (
          <Option key={activity.activityId} value={activity.activityId}>
            {activity.name}
          </Option>
        ))}
      </Select>
    </FormControl>
  )
}
