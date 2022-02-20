import { FC, useState } from 'react';
import { Activities } from './Activities';
import { Activity } from './Activity';
import { ActivityAddForm } from './ActivityAddForm';

export const ActivityContainer: FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<number>();
  const handleClick = (activityId: number) => setSelectedActivityId(activityId);

  const activity = selectedActivityId ? (
    <Activity selectedId={selectedActivityId} />
  ) : null;

  return (
    <section>
      <Activities onClick={handleClick} />
      <ActivityAddForm />
      {activity}
    </section>
  );
};
