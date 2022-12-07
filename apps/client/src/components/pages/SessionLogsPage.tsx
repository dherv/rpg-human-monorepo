import { List } from '@dherv-co/barbarian-with-style'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Box, Button, Stack, Typography } from '@mui/joy'
import { getMonth, getYear } from 'date-fns'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetSessionsQuery } from '../../features/api/apiSlice'
import { SessionQueryParams } from '../../types/api/SessionQueryParams'
import { SessionsFilters as Filters } from '../features/session/SessionsFilters'
import { SessionLog } from '../features/SessionLog'

const initialState = {
  activity: undefined,
  month: getMonth(new Date()) + 1,
  year: getYear(new Date()),
}

export const SessionLogsPage: FC = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<SessionQueryParams>(initialState)
  const [isFilterOpen, setFilterState] = useState<boolean>(false)
  const { data: sessions } = useGetSessionsQuery(filters)

  const handleChangeFilter = (name: string, value?: number) => {
    // value needs to be undefined when sent to query
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section>
      <Stack spacing={4} className='max-w-4xl'>
        <Stack direction='row' justifyContent='space-between' alignItems={'center'}>
          <Typography level='h3'>Sessions</Typography>
          <Button size='sm' variant='soft' onClick={() => navigate('/sessions/add')}>
            Add
          </Button>
        </Stack>

        <Box sx={{ marginLeft: 'auto' }}>
          <Button
            startDecorator={<FilterListIcon />}
            size='sm'
            variant='outlined'
            color='neutral'
            onClick={() => setFilterState((prev) => !prev)}
          >
            Filters
          </Button>
        </Box>
        <Filters filters={filters} onChange={handleChangeFilter} isOpen={isFilterOpen} />
        <List data-cy='session-log-list'>
          {sessions?.map((session) => (
            <SessionLog key={session.sessionId} session={session} />
          ))}
        </List>
      </Stack>
    </section>
  )
}
