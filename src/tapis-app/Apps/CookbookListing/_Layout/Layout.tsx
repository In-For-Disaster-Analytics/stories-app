import React, { useEffect } from 'react';
import { PageLayout } from 'tapis-ui/_common';
import styles from './Layout.module.scss';
import { useAppsSelect } from 'tapis-app/Apps/_components/AppsContext';
import CookbookListing from 'tapis-ui/components/cookbooks/CookbookListing';

type LayoutProps = {
  systemId: string;
  path: string;
  location: string;
};

const Layout: React.FC<LayoutProps> = ({ systemId, path, location }) => {
  // const { selectedFiles, select, unselect, clear } = useFilesSelect();
  const { selectedApps, select, unselect, clear } = useAppsSelect();
  useEffect(() => {
    clear();
  }, [systemId, path, clear]);

  const body = (
    <div className={styles.body}>
      <CookbookListing
        className={styles.container}
        systemId={systemId}
        path={path}
        location={location}
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
