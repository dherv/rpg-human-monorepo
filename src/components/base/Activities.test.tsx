import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../app/store';
import { Activities } from './Activities';

describe("Activities Component", () => {
  const onClick = jest.fn();
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Activities onClick={onClick} />
      </Provider>
    );
  });

  it("should display a list of activities on mount", async () => {
    expect(await screen.findByText("skateboard"));
    expect(await screen.findByText("surf"));
    expect(await screen.findByText("code"));
  });

  it("should call onClick when clicking an activity", async () => {
    userEvent.click(await screen.findByText("skateboard"));
    expect(onClick).toHaveBeenCalledWith(1);
  });
});
