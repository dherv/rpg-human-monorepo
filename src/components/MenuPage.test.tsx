import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuPage } from './MenuPage';

describe("MenuPage component", () => {
  const baseProps = {}
  beforeEach(() =>
    render(
      <MenuPage {...baseProps}/>
    )
  );

  describe("props and state", () => {
    it("should", () => {});
  });

  describe("integration", () => {
    it("should", () => {});
  });
});
