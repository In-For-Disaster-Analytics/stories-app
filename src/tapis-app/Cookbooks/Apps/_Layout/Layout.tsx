import React from "react";
import { AppsNav } from "../_components";
import {
  PageLayout,
  LayoutBody,
  LayoutHeader,
  LayoutNavWrapper,
} from "cookbooks-ui/_common";

import { Router } from "../_Router";

const Layout: React.FC = () => {
  const header = (
    <LayoutHeader>
      <div>Cookbooks</div>
    </LayoutHeader>
  );

  const sidebar = (
    <LayoutNavWrapper>
      <AppsNav />
    </LayoutNavWrapper>
  );

  const body = (
    <LayoutBody>
      <Router />
    </LayoutBody>
  );

  return <PageLayout top={header} left={sidebar} right={body} />;
};

export default Layout;
