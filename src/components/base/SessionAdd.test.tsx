import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from '../../app/store'
import { activitiesMock } from '../../mocks/mocks'
import { SessionAdd } from './SessionAdd'

describe('SessionAdd component', () => {
  const baseProps = { activity: activitiesMock[0] }
  beforeEach(() =>
    render(
      <Provider store={store}>
        <SessionAdd {...baseProps} />
      </Provider>,
      { wrapper: BrowserRouter },
    ),
  )

  it('should display the default duration for selected activity', async () => {
    expect(await screen.findByLabelText('duration')).toHaveDisplayValue('1')
  })

  it('should display the default date', async () => {
    expect(await screen.findByLabelText('duration')).toHaveDisplayValue('1')
  })

  it('should not show any error message if all required fields are set', async () => {
    // date and duration are already set
    const input = screen.getByLabelText('note')
    userEvent.type(input, 'note')
    await waitFor(() => {
      expect(screen.queryByText('please enter a date')).toBeNull()
      expect(screen.queryByText('please enter a duration')).toBeNull()
      expect(screen.queryByText('please enter a note')).toBeNull()
    })
  })

  it('should show the date required validation message', async () => {
    const input = screen.getByLabelText('date')
    const submit = screen.getByRole('button', { name: 'log session' })
    userEvent.clear(input)
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.getByText('please enter a date')).toBeDefined()
    })
  })

  it('should show the date pattern validation message', async () => {
    const input = screen.getByLabelText('date')
    const submit = screen.getByRole('button', { name: 'log session' })
    userEvent.clear(input)
    userEvent.type(input, 'test')
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.getByText('please enter a date in the valid format: 01/01/2022')).toBeDefined()
    })
  })

  it('should show the duration required validation message', async () => {
    const input = screen.getByLabelText('date')
    const submit = screen.getByRole('button', { name: 'log session' })
    userEvent.clear(input)
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.queryByText('please enter a duration')).toBeDefined()
    })
  })

  it('should show the note required validation message', async () => {
    const submit = screen.getByRole('button', { name: 'log session' })
    userEvent.click(submit)
    await waitFor(() => {
      expect(screen.getByText('please enter a note')).toBeDefined()
    })
  })

  it.todo('should show the submitted message and UI')
})
