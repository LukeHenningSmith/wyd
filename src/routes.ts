import AllHistoryPage from "./pages/AllPage";
import BookmarksPage from "./pages/BookmarksPage";
import HomePage from "./pages/HomePage";

export const routesConfig = [
  {
    id: "home",
    label: "Home",
    component: HomePage,
    path: "/",
  },
  {
    id: "bookmarks",
    label: "Bookmarks",
    component: BookmarksPage,
    path: "/bookmarks",
  },
  {
    id: "all_history",
    label: "All history",
    component: AllHistoryPage,
    path: "/all_history",
  },
];
