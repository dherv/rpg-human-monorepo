import { ChangeEvent, FC } from 'react'

interface Props {
  year?: number
  onChange: (year?: number) => void
}

// TODO: combine logic with FilterMonth
export const FilterYear: FC<Props> = ({ year, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : undefined
    onChange(value)
  }

  return (
    <>
      <label hidden htmlFor='year'>
        year
      </label>
      <select id='year' value={year} name='year' onChange={handleChange}>
        <option value={''}>all</option>
        <option value={2022}>2022</option>
        <option value={2021}>2021</option>
        <option value={2020}>2020</option>
      </select>
    </>
  )
}
