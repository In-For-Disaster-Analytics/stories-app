import React from "react";
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import SystemDetail from "../SystemCreate";
import { SectionMessage } from "cookbooks-ui/_common";

const Router: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <SectionMessage type="info">
          Select a system from the list.
        </SectionMessage>
      </Route>

      <Route
        path={`${path}/:systemId`}
        render={({
          match: {
            params: { systemId },
          },
        }: RouteComponentProps<{ systemId: string }>) => (
          <SystemDetail systemId={systemId} />
        )}
      />
    </Switch>
  );
};

export default Router;
