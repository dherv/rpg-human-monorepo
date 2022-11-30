import Stack from '@mui/joy/Stack'
import { FC } from 'react'
import { SessionQueryParams } from '../../../types/api/SessionQueryParams'
import { FilterActivities } from '../../base/FilterActivities'
import { FilterMonth } from '../../base/FilterMonth'
import { FilterYear } from '../../base/FilterYear'

type Props = {
  filters: SessionQueryParams
  isOpen: boolean
  onChange: (name: string, value?: number) => void
}

export type SelectEvent =
  | React.MouseEvent<Element, MouseEvent>
  | React.KeyboardEvent<Element>
  | React.FocusEvent<Element, Element>
  | null

export const SessionsFilters: FC<Props> = ({
  filters: { month, year, activity },
  onChange,
  isOpen,
}) => {
  const handleChange = (name: string, _event: SelectEvent, value: number | null) => {
    // TODO: add test, can not be null
    onChange(name, value ?? undefined)
  }

  return isOpen ? (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <FilterMonth month={month} onChange={handleChange.bind(null, 'month')} />
      <FilterYear year={year} onChange={handleChange.bind(null, 'year')} />
      <FilterActivities activity={activity} onChange={handleChange.bind(null, 'activity')} />
    </Stack>
  ) : null
}
