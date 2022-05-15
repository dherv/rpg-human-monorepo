import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { store } from '../../app/store'
import { SessionAddForm } from './SessionAddForm'

describe('SessionAddForm component', () => {
  const baseProps = { selectedActivityId: 3 }
  beforeEach(() =>
    render(
      <Provider store={store}>
        <SessionAddForm {...baseProps} />
      </Provider>,
    ),
  )

  describe('props and state', () => {
    it.skip('should display the default duration button', async () => {
      expect(await screen.findByRole('button', { name: 'add default session 4h' })).toBeDefined()
    })
  })
})
