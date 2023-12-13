import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "tapis-ui/_common";
import { useLogin } from "tapis-hooks/authenticator";

import Apps from "../Apps";
import Login from "../Login";
import Dashboard from "../Dashboard";
import Jobs from "tapis-app/Jobs";

const Router: React.FC = () => {
  const { logout } = useLogin();

  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route
        path="/logout"
        render={() => {
          logout();
          return <Redirect to="/login" />;
        }}
      />
      {/* <ProtectedRoute path="/systems">
        <Systems />
      </ProtectedRoute> */}
      <ProtectedRoute path="/apps">
        <Apps />
      </ProtectedRoute>
      <ProtectedRoute path="/jobs">
        <Jobs />
      </ProtectedRoute>
      {/* <ProtectedRoute path="/files">
        <Files />
      </ProtectedRoute>
      <ProtectedRoute path="/workflows">
        <Workflows />
      </ProtectedRoute>
      <Route path="/uipatterns">
        <SectionHeader>UI Patterns</SectionHeader>
        <UIPatterns />
      </Route> */}
    </Switch>
  );
};

export default Router;
