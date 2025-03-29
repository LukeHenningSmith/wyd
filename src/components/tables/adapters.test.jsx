import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { allHistoryTableColumns } from "./adapters";

// Mock `chrome.tabs.create` for testing
vi.stubGlobal("chrome", {
  tabs: {
    create: vi.fn(),
  },
});

describe("allHistoryTableColumns", () => {
  const mockRow = {
    original: { url: "https://example.com" },
    getValue: vi.fn(),
  };

  it("renders the ID column correctly", () => {
    const idColumn = allHistoryTableColumns.find(
      (col) => col.accessorKey === "id"
    );
    expect(idColumn).toBeDefined();
    expect(idColumn?.header).toBe("ID");
  });

  it("renders the Website column with a clickable button", async () => {
    const websiteColumn = allHistoryTableColumns.find(
      (col) => col.accessorKey === "label"
    );
    expect(websiteColumn).toBeDefined();

    // Mock row data
    mockRow.getValue.mockReturnValue("Example Website");

    // Render the cell
    const CellComponent = websiteColumn?.cell;
    render(<CellComponent row={mockRow} />);

    const button = screen.getByRole("button", { name: /example website/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("title", "Example Website");

    // Simulate clicking the button
    await userEvent.click(button);
    expect(chrome.tabs.create).toHaveBeenCalledWith({
      url: "https://example.com",
    });
  });

  it("renders the Visits column with sortable header", () => {
    const visitsColumn = allHistoryTableColumns.find(
      (col) => col.accessorKey === "visits"
    );
    expect(visitsColumn).toBeDefined();

    // Render the header
    const HeaderComponent = visitsColumn?.header;
    const mockColumn = {
      toggleSorting: vi.fn(),
      getIsSorted: vi.fn().mockReturnValue("asc"),
    };
    render(<HeaderComponent column={mockColumn} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    // Simulate clicking the sorting button
    userEvent.click(button);
  });

  it("renders the Visits column cell correctly", () => {
    const visitsColumn = allHistoryTableColumns.find(
      (col) => col.accessorKey === "visits"
    );
    expect(visitsColumn).toBeDefined();

    // Mock row data
    mockRow.getValue.mockReturnValue("12345");

    // Render the cell
    const CellComponent = visitsColumn?.cell;
    render(<CellComponent row={mockRow} />);

    const cellContent = screen.getByText("12,345");
    expect(cellContent).toBeInTheDocument();
  });
});
