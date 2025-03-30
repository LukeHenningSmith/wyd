import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { HeaderProps } from "./components/header/Header";

// Mock the `routesConfig`
vi.mock("./routes", () => ({
  routesConfig: [
    {
      id: "home",
      path: "/",
      component: () => <div data-testid="home-page">Home Page</div>,
    },
    {
      id: "bookmarks",
      path: "/bookmarks",
      component: () => <div data-testid="bookmarks-page">Bookmarks Page</div>,
    },
  ],
}));

vi.mock("./components/header/Header", () => ({
  default: ({ config }: HeaderProps) => (
    <div data-testid="header">Header with {config.length} routes</div>
  ),
}));

vi.mock("./components/Breadcrumbs", () => ({
  Breadcrumbs: () => <div data-testid="breadcrumbs">Breadcrumbs</div>,
}));

vi.mock("./components/footer/Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("./components/ui/tooltip", () => ({
  TooltipProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="tooltip-provider">{children}</div>
  ),
}));

vi.mock("./components/theme/theme-provider", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

describe("App", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders the header, breadcrumbs, footer, and routes", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the header is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();

    // Check if the breadcrumbs are rendered
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();

    // Check if the footer is rendered
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    // Check if the theme provider wraps the content
    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();

    // Check if the tooltip provider wraps the content
    expect(screen.getByTestId("tooltip-provider")).toBeInTheDocument();
  });

  it("renders the home page route by default", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the home page is rendered
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("renders the bookmarks page when navigating to /bookmarks", () => {
    window.history.pushState({}, "Bookmarks Page", "/bookmarks");

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Check if the bookmarks page is rendered
    expect(screen.getByTestId("bookmarks-page")).toBeInTheDocument();
  });
});
