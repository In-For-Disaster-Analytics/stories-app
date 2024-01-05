import React from "react";
import { JobLauncher } from "stories-ui/components/jobs";
import { PageLayout, LayoutHeader } from "cookbooks-ui/_common";

const Layout: React.FC<{ appId: string; appVersion: string }> = ({
  appId,
  appVersion,
}) => {
  const body = (
    <div style={{ flex: 1 }}>
      <JobLauncher appId={appId} appVersion={appVersion} />
    </div>
  );

  return <PageLayout right={body} />;
};

export default React.memo(Layout);
