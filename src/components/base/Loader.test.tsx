import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Loader } from './Loader';

describe("Loader component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <Loader {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
