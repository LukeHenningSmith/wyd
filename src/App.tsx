import { ThemeProvider } from "./components/theme/theme-provider";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Header config={routesConfig} />
      <div className="App" style={{ width: "800px", marginTop: "4rem" }}>
        <Routes>
          {routesConfig.map((route) => (
            <Route
              key={route.id}
              path={route.path}
              element={
                <div className="w-full flex-col py-4 px-8 mt-20 justify-center items-center">
                  <route.component />
                </div>
              }
            />
          ))}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
