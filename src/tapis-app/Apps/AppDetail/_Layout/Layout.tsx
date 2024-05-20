import React from 'react';
import { Link } from 'react-router-dom';
import { ToolbarButton } from 'tapis-app/Apps/_components/Toolbar/Toolbar';
import { PageLayout, LayoutHeader, Icon } from 'tapis-ui/_common';
import AppDetail from 'tapis-ui/components/apps/AppDetail';

const Layout: React.FC<{ appId: string; appVersion: string }> = ({
  appId,
  appVersion,
}) => {
  const header = (
    <LayoutHeader type={'sub-header'}>
      {appId} - {appVersion}
    </LayoutHeader>
  );

  const body = (
    <div style={{ flex: 1 }}>
      <AppDetail appId={appId} appVersion={appVersion} />
    </div>
  );

  return <PageLayout top={header} right={body} />;
};

export default React.memo(Layout);
