import React from 'react';
import { AppsNav } from '../_components';
import {
  PageLayout,
  LayoutBody,
  LayoutHeader,
  Breadcrumbs,
} from 'tapis-ui/_common';

import { Router } from '../_Router';
import { useLocation } from 'react-router-dom';
import breadcrumbsFromPathname from 'tapis-ui/_common/Breadcrumbs/breadcrumbsFromPathname';
import styles from './Layout.module.scss';
import { AppsProvider } from '../_components/AppsContext';
import Toolbar from '../_components/Toolbar';

const Layout: React.FC = () => {
  const header = (
    <LayoutHeader>
      <div>Apps</div>
      <Toolbar />
    </LayoutHeader>
  );

  const body = (
    <LayoutBody>
      <Router />
    </LayoutBody>
  );

  return (
    <AppsProvider>
      <PageLayout top={header} right={body} />
    </AppsProvider>
  );
};

export default Layout;
