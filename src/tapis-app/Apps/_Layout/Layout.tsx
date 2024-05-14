import React from 'react';
import { AppsNav } from '../_components';
import {
  PageLayout,
  LayoutBody,
  LayoutHeader,
  Breadcrumbs,
} from 'tapis-ui/_common';

import { Router } from '../_Router';
import Toolbar from '../_components/Toolbar';
import { useLocation } from 'react-router-dom';
import breadcrumbsFromPathname from 'tapis-ui/_common/Breadcrumbs/breadcrumbsFromPathname';
import styles from './Layout.module.scss';
import { AppsProvider } from '../_components/AppsContext';

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const crumbs = breadcrumbsFromPathname(pathname).splice(1);
  const header = (
    <LayoutHeader>
      <div>Apps</div>
      <div className={styles.breadcrumbs}>
        <Breadcrumbs breadcrumbs={[{ text: 'Files' }, ...crumbs]} />
      </div>
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
      <PageLayout top={header} right={body} />;
    </AppsProvider>
  );
};

export default Layout;
