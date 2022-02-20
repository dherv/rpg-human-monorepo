import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { store } from '../../app/store';
import { Activity } from './Activity';

describe("Activity component", () => {
  const baseProps = { selectedId: 1 };
  beforeEach(() =>
    render(
      <Provider store={store}>
        <Activity {...baseProps} />
      </Provider>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
