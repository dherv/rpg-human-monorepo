import { FC, useState } from "react";
import { Activities } from "./base/Activities";
import { SessionAddForm } from "./base/SessionAddForm";

export const SessionAddPage: FC = () => {
  const [selectedActivityId, setSelectedActivityId] = useState<number>();
  const handleClick = (activityId: number) => setSelectedActivityId(activityId);

  return (
    <section>
      <Activities onClick={handleClick} />
      <SessionAddForm selectedActivityId={selectedActivityId} />
    </section>
  );
};
