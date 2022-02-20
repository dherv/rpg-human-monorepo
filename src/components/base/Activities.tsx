import { FC } from 'react';
import { useGetActivitiesQuery } from '../../features/api/apiSlice';

export const Activities: FC<{ onClick: (activityId: number) => void }> = ({
  onClick,
}) => {
  const {
    data: activities,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetActivitiesQuery();

  const handleSelectActivity = (activityId: number) => {
    onClick(activityId);
  };

  let content;

  if (isLoading) {
    content = <p>isLoading...</p>;
  } else if (isSuccess) {
    content = activities?.map((activity) => (
      <li key={activity.id} onClick={() => handleSelectActivity(activity.id)}>
        {activity.name}
      </li>
    ));
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <section className="activities-list">
      <h2>activities</h2>
      {content}
    </section>
  );
};
