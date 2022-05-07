import { getMonth, getYear } from 'date-fns';
import { FC, useState } from 'react';
import { List } from '@dherv/barbarian-with-style';
import { useGetSessionsQuery } from '../../features/api/apiSlice';
import { FilterActivities } from '../base/FilterActivities';
import { FilterMonth } from '../base/FilterMonth';
import { FilterYear } from '../base/FilterYear';
import { SessionLog } from '../features/SessionLog';

export const SessionLogs: FC = () => {
  // TODO: set default month and year and query by this ?
  const [month, setMonth] = useState<number | undefined>(getMonth(new Date()));
  const [year, setYear] = useState<number | undefined>(getYear(new Date()));
  const [activity, setActivity] = useState<number>();
  const {
    data: sessions,
    isLoading,
    isFetching,
  } = useGetSessionsQuery({ activity, month, year });
  // TODO: move to useReducer and group ?
  console.log({ month, year, activity });
  return (
    <section>
      <>
        <FilterMonth month={month} onChange={(month) => setMonth(month)} />
        <FilterYear year={year} onChange={(year) => setYear(year)} />
        <FilterActivities
          activity={activity}
          onChange={(activity) => setActivity(activity)}
        />
      </>
      <List>
        {sessions?.map((session) => (
          <SessionLog key={session.session_id} session={session} />
        ))}
      </List>
    </section>
  );
};
