import React from "react";
import { useTapisConfig } from "tapis-hooks";
import styles from "./Sidebar.module.scss";
import { Navbar, NavItem } from "cookbooks-ui/_wrappers/Navbar";

const Sidebar: React.FC = () => {
  const { accessToken } = useTapisConfig();
  return (
    <div className={styles.root}>
      <Navbar>
        <NavItem to="/" icon="dashboard">
          Dashboard
        </NavItem>
        {!accessToken && (
          <NavItem to="/login" icon="user">
            Login
          </NavItem>
        )}
        {accessToken && (
          <>
            <NavItem to="/cookbooks/systems" icon="data-files">
              Cookbooks Systems
            </NavItem>
            {/* <NavItem to="/files" icon="folder">
              Files
            </NavItem> */}
            <NavItem to="/apps" icon="applications">
              Cookbooks
            </NavItem>
            <NavItem to="/jobs" icon="jobs">
              Jobs
            </NavItem>
            {/*<NavItem to="/workflows" icon="publications">
              Workflows
            </NavItem> */}
          </>
        )}
      </Navbar>
    </div>
  );
};

export default Sidebar;
