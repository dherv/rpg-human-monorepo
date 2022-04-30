import { FC } from 'react';
import { List, ListItem } from '@dherv/barbarian-with-style';
import { useGetSessionsByActivityQuery } from '../../features/api/apiSlice';
import { Loader } from './Loader';

export const ActivitySession: FC<{ activityId: number }> = ({ activityId }) => {
  const {
    data: sessions,
    isLoading,
    isFetching,
  } = useGetSessionsByActivityQuery({ activityId });

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    // TODO: get only this month session as default
    <List>
      {sessions?.map((session) => (
        <ListItem key={session.session_id}>
          <div>{session.date}</div>
          <div>{session.duration}</div>
          <div>{session.note}</div>
          <div>{session.improvement}</div>
          <div>{session.proud}</div>
        </ListItem>
      ))}
    </List>
  );
};
