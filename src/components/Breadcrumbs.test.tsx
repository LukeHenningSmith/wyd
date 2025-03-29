import { it, expect, vi, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Breadcrumbs } from "./Breadcrumbs";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const renderBreadcrumbsWithRouter = (initialPath: string) => {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Breadcrumbs />
    </MemoryRouter>
  );
};

describe("Breadcrumbs", () => {
  it("renders 'Home' when empty", () => {
    renderBreadcrumbsWithRouter("");

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders 'Home' breadcrumb when on the root path", () => {
    renderBreadcrumbsWithRouter("/");

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders breadcrumbs for nested paths", () => {
    renderBreadcrumbsWithRouter("/section/subsection");

    expect(screen.getByText("Section")).toBeInTheDocument();
    expect(screen.getByText("Subsection")).toBeInTheDocument();
  });

  it("clicking causes navigate to be called", () => {
    renderBreadcrumbsWithRouter("/section/subsection");

    screen.getByText("Section").click();
    expect(navigateMock).toHaveBeenCalledWith("/section");

    screen.getByText("Subsection").click();
    expect(navigateMock).toHaveBeenCalledWith("/section/subsection");
  });
});
