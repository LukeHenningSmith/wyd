import { describe, it, expect } from "vitest";
import { routesConfig } from "./routes";

describe("routesConfig", () => {
  it("should define all routes with correct properties", () => {
    expect(routesConfig).toHaveLength(3);

    // Test the "Home" route
    const homeRoute = routesConfig.find((route) => route.id === "home");
    expect(homeRoute).toBeDefined();
    expect(homeRoute?.label).toBe("Home");
    expect(homeRoute?.path).toBe("/");
    expect(homeRoute?.component).toBeDefined();

    // Test the "Bookmarks" route
    const bookmarksRoute = routesConfig.find(
      (route) => route.id === "bookmarks"
    );
    expect(bookmarksRoute).toBeDefined();
    expect(bookmarksRoute?.label).toBe("Bookmarks");
    expect(bookmarksRoute?.path).toBe("/bookmarks");
    expect(bookmarksRoute?.component).toBeDefined();

    // Test the "All history" route
    const allHistoryRoute = routesConfig.find(
      (route) => route.id === "all_history"
    );
    expect(allHistoryRoute).toBeDefined();
    expect(allHistoryRoute?.label).toBe("All history");
    expect(allHistoryRoute?.path).toBe("/all_history");
    expect(allHistoryRoute?.component).toBeDefined();
  });

  it("should have unique route IDs", () => {
    const ids = routesConfig.map((route) => route.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should have unique paths", () => {
    const paths = routesConfig.map((route) => route.path);
    const uniquePaths = new Set(paths);
    expect(uniquePaths.size).toBe(paths.length);
  });
});
