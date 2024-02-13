import React from "react";
import { JobDetail } from "cookbooks-ui/components/jobs";
import { PageLayout, LayoutHeader } from "cookbooks-ui/_common";

interface JobDetailProps {
  jobUuid: string;
}

const Layout: React.FC<JobDetailProps> = ({ jobUuid }) => {
  const header = <LayoutHeader type={"sub-header"}>Job Details</LayoutHeader>;

  const body = (
    <div style={{ flex: 1 }}>
      <JobDetail jobUuid={jobUuid}></JobDetail>
    </div>
  );
  return <PageLayout top={header} right={body}></PageLayout>;
};

export default Layout;
