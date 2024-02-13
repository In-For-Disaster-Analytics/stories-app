import React from "react";
import { Navbar, NavItem } from "tapis-ui/_wrappers/Navbar";
import { AppCreate } from "./CreateApp";
import appList from "../../../../../catalog/apps";

const AppsNav: React.FC = () => {
  return (
    <Navbar>
      {appList.length ? (
        appList.map((app) => (
          <NavItem
            to={`/cookbooks/apps/${app.spec.id}/${app.spec.version}`}
            icon="applications"
            key={app.spec.id}
          >
            {`${app.name} v${app.spec.version}`}
          </NavItem>
        ))
      ) : (
        <>
          <i>No templates found</i>
          <AppCreate />
        </>
      )}
    </Navbar>
  );
};

export default AppsNav;
