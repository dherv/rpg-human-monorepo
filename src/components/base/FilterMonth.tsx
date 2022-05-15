import { ChangeEvent, FC } from 'react'

interface Props {
  month?: number
  onChange: (month?: number) => void
}

export const FilterMonth: FC<Props> = ({ month, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? Number(event.target.value) : undefined
    onChange(value)
  }

  return (
    <>
      <label hidden htmlFor='month'>
        month
      </label>
      <select id='month' value={month} name='month' onChange={handleChange}>
        <option value={''}>all</option>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>September</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
    </>
  )
}
