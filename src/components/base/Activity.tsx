import { FC } from 'react';
import { useGetActivityQuery } from '../../features/api/apiSlice';

export const Activity: FC<{ selectedId: number }> = ({ selectedId }) => {
  const {
    data: activity,
    isFetching,
    isSuccess,
  } = useGetActivityQuery(selectedId);

  let content;
  if (isFetching) {
    content = <p> Loading... </p>;
  } else if (isSuccess) {
    content = (
      <article>
        <h2>update activiy - {activity?.name}</h2>
      </article>
    );
  }

  return <section>{content}</section>;
};
