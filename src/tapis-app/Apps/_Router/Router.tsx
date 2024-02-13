import React from "react";
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { SectionMessage } from "cookbooks-ui/_common";
import { JobLauncher } from "cookbooks-ui/components/jobs";

const Router: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact>
        <SectionMessage type="info">
          Select an cookbook template from the list.
        </SectionMessage>
      </Route>

      <Route
        path={`${path}/:appId/:appVersion`}
        render={({
          match: {
            params: { appVersion, appId },
          },
        }: RouteComponentProps<{
          appId: string;
          appVersion: string;
        }>) => <JobLauncher appId={appId} appVersion={appVersion} />}
      />
    </Switch>
  );
};

export default Router;
