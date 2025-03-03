import { ThemeProvider } from "./components/theme/theme-provider";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "./routes";
import { Breadcrumbs } from "./components/Breadcrumbs";
import Footer from "./components/footer/Footer";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Header config={routesConfig} />
        <div className="App" style={{ width: "800px" }}>
          <Breadcrumbs />
          <div className="w-full flex-col justify-center items-center px-8">
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
          <Footer />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
