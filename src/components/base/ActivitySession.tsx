import { FC } from 'react';
import { useGetSessionsQuery } from '../../features/api/apiSlice';
import { Loader } from './Loader';

export const ActivitySession: FC<{ activityId: number }> = ({ activityId }) => {
  const {
    data: sessions,
    isLoading,
    isFetching,
  } = useGetSessionsQuery({ activityId });

  if (isLoading || isFetching) {
    return <Loader />;
  }
  return (
    // TODO: get only this month session as default
    <div>
      {sessions?.map((session) => (
        <li key={session.id}>
          <div>{session.date}</div>
          <div>{session.duration}</div>
          <div>{session.note}</div>
          <div>{session.improvement}</div>
          <div>{session.proud}</div>
        </li>
      ))}
    </div>
  );
};
