import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from '../../app/store';
import { SessionLogs } from './SessionLogs';

describe("ActivitySession component", () => {
  const baseProps = {};
  beforeEach(() =>
    render(
      <Provider store={store}>
        <SessionLogs {...baseProps} />
      </Provider>
    )
  );

  it("should display the right dot color", async () => {
    const color = await screen.findAllByTitle("activity color");
    expect(color[0].nextSibling).toHaveAttribute("fill", "blue");
  });
  it("should display the date formatted properly", async () => {
    expect(await screen.findAllByText("03/02/2022")).toBeDefined();
  });
});
