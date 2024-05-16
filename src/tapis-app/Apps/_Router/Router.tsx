import React from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import AppCreator from '../AppsCreator';
import CookbookListing from '../AppListing';
import AppDetail from '../AppDetail';

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
        }>) => <AppDetail appId={appId} appVersion={appVersion} />}
      />
    </Switch>
  );
};

export default Router;
