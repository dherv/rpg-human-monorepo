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
        <li key={session.id}>{session.date}</li>
      ))}
    </div>
  );
};
