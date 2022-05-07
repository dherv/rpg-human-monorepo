import { FC } from 'react';

interface Props {
  title: string;
  content?: string;
}

export const SessionLogDetail: FC<Props> = ({ title, content }) => {
  return content ? (
    <li className="mb-2">
      <div className="text-xs text-gray-800 font-medium">{title}</div>
      <div className="text-xs text-gray-500 font-regular">{content}</div>
    </li>
  ) : null;
};
