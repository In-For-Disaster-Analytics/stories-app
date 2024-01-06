import React, { useEffect } from "react";
import { JobLauncher } from "stories-ui/components/jobs";
import { PageLayout, LayoutHeader } from "cookbooks-ui/_common";
import appList from "../../../../../catalog/apps";
import ReadmeViewer from "tapis-app/Cookbook/Readme";
import { Button } from "reactstrap";
import useCreate from "tapis-hooks/apps/useCreate";

const Layout: React.FC<{ appId: string; appVersion: string }> = ({
  appId,
  appVersion,
}) => {
  const app = appList.find(
    (app) => app.spec.id === appId && app.spec.version === appVersion
  );

  const { isLoading, error, isSuccess, submit, data } = useCreate();

  useEffect(() => {
    if (!app) return;
    // submit(app.spec);
  }, []);

  const button = (
    <Button
      color="primary"
      onClick={() => {
        if (!app) return;
        submit(app?.spec);
      }}
      disabled={app === undefined || isLoading}
    >
      Add
    </Button>
  );

  const successText = (
    <div>
      Successfully created {app?.name} {app?.spec.version}
    </div>
  );

  const errorText = (
    <div>
      Failed to create {app?.name} {app?.spec.version}
    </div>
  );

  const readmeViewer = (
    <ReadmeViewer
      id={app?.spec.id}
      version={app?.spec.version}
      notes={app?.spec.notes}
    />
  );

  const body = (
    <div style={{ flex: 1 }}>
      <LayoutHeader type={"sub-header"}>{app?.name}</LayoutHeader>
      <LayoutHeader type={"sub-header"}>
        {button} {isSuccess ? successText : <></>} {error && error.message}
      </LayoutHeader>
      {app && app.spec && app.spec.notes ? (
        <ReadmeViewer
          id={app?.spec.id}
          version={app?.spec.version}
          notes={app?.spec.notes}
        />
      ) : (
        <span> No README </span>
      )}
    </div>
  );

  return <PageLayout right={body} />;
};

export default React.memo(Layout);
