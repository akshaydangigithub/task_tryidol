import React, { Suspense, useContext } from "react";
import { DataContext } from "./context/contextApi";
import { Navigate, Route, Routes } from "react-router-dom";
import { RouteConfig, UserRouteConfig } from "./utils/RouteConfig";
import Loader from "./components/Loader";

const App = () => {
  const { isAuthenticated } = useContext(DataContext);

  return (
    <Routes>
      {/* Genral Routes */}
      {RouteConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<Suspense fallback={<Loader />}>{route.component}</Suspense>}
        />
      ))}

      {/* User Routes */}

      {UserRouteConfig.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<Loader />}>
              {isAuthenticated ? route.component : <Navigate to="/" />}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
