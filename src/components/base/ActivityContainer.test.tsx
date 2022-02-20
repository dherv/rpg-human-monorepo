import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../app/store';
import { ActivityContainer } from './ActivityContainer';

describe("ActivityContainer Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ActivityContainer />
      </Provider>
    );
  });

  it("should add an activiy", async () => {
    userEvent.type(screen.getByPlaceholderText("name"), "new activity");
    userEvent.click(screen.getByRole("button", { name: "submit" }));
    expect(await screen.findByText("new activity")).toBeDefined();
  });

  it("should display the activity on click", async () => {
    userEvent.click(await screen.findByText("skateboard"));
    expect(
      await screen.findByText(/update activiy - skateboard/)
    ).toBeDefined();
  });
});
