import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AllHistoryPage from "./AllPage";

vi.mock("@/components/tables/AllHistoryTable", () => ({
  AllHistoryTable: () => (
    <div data-testid="all-history-table">All History Table</div>
  ),
}));

describe("AllHistoryPage", () => {
  it("renders the AllHistoryTable component", () => {
    render(<AllHistoryPage />);

    // Check if the AllHistoryTable component is rendered
    const table = screen.getByTestId("all-history-table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveTextContent("All History Table");
  });
});
