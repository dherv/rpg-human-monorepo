import { format } from 'date-fns';
import { FC, useState } from 'react';
import { List, ListItem } from '@dherv/barbarian-with-style';
import { useGetSessionsQuery } from '../../features/api/apiSlice';
import { Dot } from '../base/Dot';
import { FilterActivities } from '../base/FilterActivities';
import { FilterMonth } from '../base/FilterMonth';
import { FilterYear } from '../base/FilterYear';

export const SessionLogs: FC = () => {
  const { data: sessions, isLoading, isFetching } = useGetSessionsQuery();
  // TODO: move to useReducer and group ?

  // TODO: set default month and year and query by this ?
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();
  const [activity, setActivity] = useState<number>();

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
          <ListItem
            key={session.session_id}
            className="flex items-center justify-between p-2"
          >
            <div className="flex items-center">
              <Dot color="blue" />
              <p className="mx-2">{session.activity?.name}</p>
            </div>
            <p>{format(new Date(session.date), "MM/dd/yyyy")}</p>
          </ListItem>
        ))}
      </List>
    </section>
  );
};
