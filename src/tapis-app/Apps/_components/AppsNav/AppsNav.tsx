import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useList } from "tapis-hooks/apps";
import { Apps } from "@tapis/tapis-typescript";
import { Navbar, NavItem } from "cookbooks-ui/_wrappers/Navbar";
import { QueryWrapper } from "cookbooks-ui/_wrappers";
import { Button } from "reactstrap";
import { AppCreate } from "./CreateApp";

const AppsNav: React.FC = () => {
  const { data, isLoading, error } = useList(
    {},
    { refetchOnWindowFocus: false }
  );
  const { url } = useRouteMatch();
  const appList: Array<Apps.TapisApp> = data?.result ?? [];
  console.log(url);

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <Navbar>
        {appList.length ? (
          appList
            .filter((app) => app.id?.includes("jupyter"))
            .map((app) => (
              <NavItem
                to={`/apps/${app.id}/${app.version}`}
                icon="applications"
                key={app.id}
              >
                {`${app.id} v${app.version}`}
              </NavItem>
            ))
        ) : (
          <>
            <i>No templates found</i>
            <AppCreate />
          </>
        )}
      </Navbar>
    </QueryWrapper>
  );
};

export default AppsNav;
