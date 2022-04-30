import { FC } from 'react';
import { useGetCharacterQuery } from '../../features/api/apiSlice';

export const Character: FC = () => {
  const { data: character, isFetching, isLoading } = useGetCharacterQuery();

  if (isFetching || isLoading) {
    return <div>getting the character</div>;
  }

  return character ? (
    <section>
      <h2>{character.name}</h2>
      <ul>
        <li>
          <span>physical:</span>
          <span>{character.physical}</span>
        </li>
        <li>
          <span>mental:</span>
          <span>{character.mental}</span>
        </li>
        <li>
          <span>courage:</span>
          <span>{character.courage}</span>
        </li>
        <li>
          <span>active:</span>
          <span>{character.active}</span>
        </li>
      </ul>
    </section>
  ) : null;
};
