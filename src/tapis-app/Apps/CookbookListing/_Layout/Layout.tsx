import React, { useEffect } from 'react';
import { PageLayout } from 'tapis-ui/_common';
import styles from './Layout.module.scss';
import { useAppsSelect } from 'tapis-app/Apps/_components/AppsContext';
import CookbookListing from 'tapis-ui/components/cookbooks/CookbookListing';

const Layout: React.FC = () => {
  // const { selectedFiles, select, unselect, clear } = useFilesSelect();
  const { selectedApps, select, unselect, clear } = useAppsSelect();

  const body = (
    <div className={styles.body}>
      <CookbookListing
        className={styles.container}
        selectMode={{ mode: 'multi', types: ['dir', 'app'] }}
        selectedApps={selectedApps}
        onSelect={(apps) => select(apps, 'multi')}
        onUnselect={unselect}
      ></CookbookListing>
    </div>
  );

  return <PageLayout right={body} constrain></PageLayout>;
};

export default Layout;
