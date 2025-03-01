import ChartsPage from "./pages/ChartsPage";
import HomePage from "./pages/HomePage";
import TablePage from "./pages/TablePage";

export const routesConfig = [
  {
    id: "home",
    label: "Home",
    component: HomePage,
    path: "/",
  },
  {
    id: "charts",
    label: "Charts",
    component: ChartsPage,
    path: "/charts",
  },
  {
    id: "table",
    label: "Table",
    component: TablePage,
    path: "/table",
  },
];
