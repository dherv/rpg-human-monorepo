import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Character } from './Character';

describe("Character component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <Character {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
