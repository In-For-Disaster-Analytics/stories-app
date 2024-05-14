import React from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import JobLauncher from '../JobLauncher';
import { SectionMessage } from 'tapis-ui/_common';
import AppCreator from '../AppsCreator';
import CookbookListing from '../CookbookListing';

const Router: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`} exact>
        <CookbookListing />
      </Route>

      <Route path={`${path}/new`} render={() => <AppCreator />}></Route>

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
