import { FormControl } from '@mui/joy'
import FormLabel from '@mui/joy/FormLabel'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import { FC } from 'react'
import { SelectEvent } from '../features/session/SessionsFilters'
interface Props {
  month?: number
  onChange: (event: SelectEvent, value: number | null) => void
}

export const FilterMonth: FC<Props> = ({ month, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 240 }}>
      <FormLabel id='month' htmlFor='month-button'>
        month
      </FormLabel>
      <Select
        defaultValue={month}
        name='month'
        onChange={onChange}
        componentsProps={{
          button: {
            id: 'month-button',
            // TODO: Material UI set aria-labelledby correctly & automatically
            // but MUI Base and Joy UI don't yet.
            'aria-labelledby': 'month-label month-button',
          },
        }}
      >
        <Option value={null}>all</Option>
        <Option value={1}>January</Option>
        <Option value={2}>February</Option>
        <Option value={3}>March</Option>
        <Option value={4}>April</Option>
        <Option value={5}>May</Option>
        <Option value={6}>June</Option>
        <Option value={7}>July</Option>
        <Option value={8}>August</Option>
        <Option value={9}>September</Option>
        <Option value={10}>October</Option>
        <Option value={11}>November</Option>
        <Option value={12}>December</Option>
      </Select>
    </FormControl>
  )
}
