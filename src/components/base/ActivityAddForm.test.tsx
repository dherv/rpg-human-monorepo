import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../app/store';
import { ActivityAddForm } from './ActivityAddForm';

const addNewActivity = jest.fn();

jest.mock("../../features/api/apiSlice", () => ({
  ...jest.requireActual("../../features/api/apiSlice"),
  useAddNewActivityMutation: jest
    .fn()
    .mockImplementation(() => [addNewActivity, { isLoading: false }]),
}));

describe("ActivityAddForm Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ActivityAddForm />
      </Provider>
    );
  });
  it("should dispatch a call to add a new activity", async () => {
    userEvent.type(screen.getByPlaceholderText("name"), "new activity");
    userEvent.click(screen.getByRole("button", { name: "submit" }));
    await waitFor(() =>
      expect(addNewActivity).toHaveBeenCalledWith({
        name: "new activity",
      })
    );
    expect(screen.getByPlaceholderText("name")).toHaveDisplayValue("");
  });
});
