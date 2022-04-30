import { FC } from 'react';

interface Props {
  color: string;
}
export const Dot: FC<Props> = ({ color }) => {
  return (
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  );
};
