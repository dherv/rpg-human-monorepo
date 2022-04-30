import { format } from 'date-fns';
import { FC } from 'react';
import { List, ListItem } from '@dherv/barbarian-with-style';
import { useGetSessionsQuery } from '../../features/api/apiSlice';
import { Dot } from './Dot';

export const SessionLogs: FC = () => {
  const { data: sessions, isLoading, isFetching } = useGetSessionsQuery();
  return (
    <div>
      <List>
        {sessions?.map((session) => (
          <ListItem className="flex items-center justify-between p-2">
            <div className="flex items-center">
              <Dot color="blue" />
              <p className="mx-2">{session.activity?.name}</p>
            </div>
            <p>{format(new Date(session.date), "MM/dd/yyyy")}</p>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
