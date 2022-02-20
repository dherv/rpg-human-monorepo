import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './app/store';

describe("App Component", () => {
  it("should display a list of activities on mount", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(await screen.findByText("skateboard"));
  });
});
