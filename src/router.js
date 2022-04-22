import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import routes from "./routes";

const Router = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          exact
          element={route.element}
          path={route.path}
        />
      ))}
      <Route exact element={<Dashboard />} path="*" />
    </Routes>
  );
};

export default Router;
