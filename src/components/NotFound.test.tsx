import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFound } from './NotFound';

describe("NotFound component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <NotFound {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
