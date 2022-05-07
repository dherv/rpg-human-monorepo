import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../app/store';
import { sessionsMock } from '../../mocks/mocks';
import { SessionLog } from './SessionLog';

describe("SessionLog component", () => {
  it("should show the session content on click", async () => {
    const props = { session: sessionsMock[3] };
    render(
      <Provider store={store}>
        <SessionLog {...props} />
      </Provider>
    );
    const element = await screen.findByText("surf");
    userEvent.click(element);
    expect(await screen.findByText("note")).toBeDefined();
  });

  it("should show the no content on click if session does not have details", async () => {
    const props = { session: sessionsMock[2] };
    render(
      <Provider store={store}>
        <SessionLog {...props} />
      </Provider>
    );
    const element = await screen.findByText("skateboard");
    userEvent.click(element);
    expect(await screen.findByText("no content")).toBeDefined();
  });
});
