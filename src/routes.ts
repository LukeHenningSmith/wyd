import BookmarksPage from "./pages/BookmarksPage";
import HomePage from "./pages/HomePage";
import TrendsPage from "./pages/TrendsPage";
import AllPage from "./pages/AllPage";

export const routesConfig = [
  {
    id: "home",
    label: "Home",
    component: HomePage,
    path: "/",
  },
  {
    id: "trends",
    label: "Trends",
    component: TrendsPage,
    path: "/trends",
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    component: BookmarksPage,
    path: "/bookmarks",
  },
  {
    id: "all",
    label: "All",
    component: AllPage,
    path: "/all",
  },
];
