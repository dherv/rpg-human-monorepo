import { FormControl } from '@mui/joy'
import FormLabel from '@mui/joy/FormLabel'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import { FC } from 'react'
import { SelectEvent } from '../features/session/SessionsFilters'
interface Props {
  year?: number
  onChange: (event: SelectEvent, value: number | null) => void
}

// TODO: combine logic with FilterMonth
export const FilterYear: FC<Props> = ({ year, onChange }) => {
  return (
    <FormControl sx={{ minWidth: 240 }}>
      <FormLabel id='year' htmlFor='year-button'>
        year
      </FormLabel>
      <Select
        defaultValue={year}
        name='year'
        onChange={onChange}
        componentsProps={{
          button: {
            id: 'year-button',
            // TODO: Material UI set aria-labelledby correctly & automatically
            // but MUI Base and Joy UI don't yet.
            'aria-labelledby': 'year-label year-button',
          },
        }}
      >
        <Option value={null}>all</Option>
        <Option value={2022}>2022</Option>
        <Option value={2021}>2021</Option>
        <Option value={2020}>2020</Option>
      </Select>
    </FormControl>
  )
}
