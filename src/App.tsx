import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Header config={routesConfig} />
      <div className="App" style={{ width: "700px", marginTop: "4rem" }}>
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
