import { ChangeEvent, FC } from 'react';

interface Props {
  year?: number;
  onChange: (month: number) => void;
}

export const FilterYear: FC<Props> = ({ year, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    onChange(value);
  };

  return (
    <select value={year} name="year" onChange={handleChange}>
      <option value={undefined}>all</option>
      <option value={2022}>2022</option>
      <option value={2021}>2021</option>
      <option value={2020}>2020</option>
    </select>
  );
};
