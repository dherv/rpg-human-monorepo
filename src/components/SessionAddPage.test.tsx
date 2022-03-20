import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SessionAddPage } from './SessionAddPage';

describe("SessionAddPage component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <SessionAddPage {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
