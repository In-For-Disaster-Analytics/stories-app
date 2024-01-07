import React from "react";
import { useTapisConfig } from "tapis-hooks";
import styles from "./Sidebar.module.scss";
import { Navbar, NavItem } from "cookbooks-ui/_wrappers/Navbar";
import { Divider } from "@material-ui/core";

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
            <NavItem to="/systems" icon="data-files">
              Systems
            </NavItem>
            <NavItem to="/apps" icon="applications">
              Apps
            </NavItem>
            <NavItem to="/jobs" icon="jobs">
              Jobs
            </NavItem>
            <Divider />
            <span className={styles["nav-text"]}>Cookbooks</span>
            <NavItem to="/cookbooks/systems" icon="data-files">
              Cookbooks Systems
            </NavItem>
            <NavItem to="/cookbooks/apps" icon="applications">
              Cookbooks Apps
            </NavItem>
          </>
        )}
      </Navbar>
    </div>
  );
};

export default Sidebar;
