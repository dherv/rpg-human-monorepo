import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from '../../app/store';
import { Activity } from './Activity';

describe("Activity component", () => {
  const baseProps = { selectedId: 3 };
  beforeEach(() =>
    render(
      <Provider store={store}>
        <Activity {...baseProps} />
      </Provider>
    )
  );

  describe("props and state", () => {
    it("should display the activity name", async () => {
      expect(await screen.findByText("update activiy - code")).toBeDefined();
    });
    it("should display the default duration button", async () => {
      expect(
        await screen.findByRole("button", { name: "add default session 4h" })
      ).toBeDefined();
    });
  });

  describe("integration", () => {});
});
