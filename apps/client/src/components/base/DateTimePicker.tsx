import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DateTimePicker as MUIDatePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import * as React from 'react'
import { ControllerFieldState, ControllerRenderProps, UseFormStateReturn } from 'react-hook-form'
import { Inputs } from './SessionAdd'

type Props = {
  field: ControllerRenderProps<Inputs, 'date'>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<Inputs>
}
export const DateTimePicker: React.FC<Props> = ({ field: { onChange, ...rest }, fieldState }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MUIDatePicker
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            id='date'
            error={Boolean(fieldState.error)}
            helperText={fieldState.error?.message}
          />
        )}
        {...rest}
      />
    </LocalizationProvider>
  )
}
