import React from "react";
import { JobLauncher } from "stories-ui/components/jobs";
import { PageLayout, LayoutHeader } from "cookbooks-ui/_common";

const Layout: React.FC<{ appId: string; appVersion: string }> = ({
  appId,
  appVersion,
}) => {
  const header = <LayoutHeader type={"sub-header"}>Job Launcher</LayoutHeader>;

  const body = (
    <div style={{ flex: 1 }}>
      <JobLauncher appId={appId} appVersion={appVersion} />
    </div>
  );

  return <PageLayout top={header} right={body} />;
};

export default React.memo(Layout);
