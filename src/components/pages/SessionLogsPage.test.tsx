import { format } from 'date-fns'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { store } from '../../app/store'
import { SessionLogsPage } from './SessionLogsPage'

describe('SessionLogs component', () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <Provider store={store}>
        <SessionLogsPage {...baseProps} />
      </Provider>,
    ),
  )

  afterEach(() => jest.resetAllMocks())

  it('should display the right activity color dot', async () => {
    const color = await screen.findAllByTitle('activity color')
    expect(color[0].nextSibling).toHaveAttribute('fill', 'blue')
  })

  it('should display the date formatted properly', async () => {
    const today = format(new Date(), 'MM/dd/yyyy')
    expect(await screen.findAllByText(today)).toBeDefined()
  })

  it('should set the default month and year to today date', async () => {
    const month = format(Date.now(), 'MMMM')
    expect(await screen.findByLabelText('month')).toHaveDisplayValue(month)
  })

  // FIXME: test is very slow and working only on it.only mode
  it.skip('should select all logs when set to all', async () => {
    const monthSelect = screen.getByLabelText('month')
    const yearSelect = screen.getByLabelText('year')
    userEvent.selectOptions(monthSelect, 'all')
    userEvent.selectOptions(yearSelect, 'all')
    expect(await screen.findAllByRole('listitem')).toHaveLength(3)
  })

  it.todo('should filter the list by activity')
  it.todo('should filter the list by month')
  it.todo('should filter the list by year')
})
