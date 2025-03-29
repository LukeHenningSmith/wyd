import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { AllHistoryTable } from "./AllHistoryTable";
import { useHistory } from "@/hooks/history";

vi.mock("@/hooks/history", () => ({
  useHistory: vi.fn(),
}));

describe("AllHistoryTable", () => {
  const mockUseHistory = useHistory as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the table with data", () => {
    mockUseHistory.mockReturnValue({
      data: [
        {
          id: 1,
          label: "Example Website",
          visits: 123,
          url: "https://example.com",
        },
        {
          id: 2,
          label: "Another Website",
          visits: 456,
          url: "https://another.com",
        },
      ],
      isPending: false,
    });

    render(<AllHistoryTable />);

    // Check if the table headers are rendered
    expect(screen.getByText("Website")).toBeInTheDocument();
    expect(screen.getByText("Page Visits")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveTextContent("All time");

    expect(screen.getByText("2 rows"));
  });

  it("renders the loader when data is pending", () => {
    mockUseHistory.mockReturnValue({
      data: null,
      isPending: true,
    });

    render(<AllHistoryTable />);

    // Check if the loader is rendered
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
