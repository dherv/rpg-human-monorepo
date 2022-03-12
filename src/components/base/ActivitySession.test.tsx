import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ActivitySession } from './ActivitySession';

describe("ActivitySession component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <ActivitySession {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
