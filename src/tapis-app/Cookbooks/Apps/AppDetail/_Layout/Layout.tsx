import React, { useEffect } from "react";
import { JobLauncher } from "stories-ui/components/jobs";
import { PageLayout, LayoutHeader, LoadingSpinner } from "cookbooks-ui/_common";
import cookbookApps from "../../../../../catalog/apps";
import ReadmeViewer from "tapis-app/Cookbook/Readme";
import { Button } from "reactstrap";
import useCreate from "tapis-hooks/apps/useCreate";
import { useList } from "tapis-hooks/apps";
import { Link } from "react-router-dom";
import { SubmitWrapper } from "cookbooks-ui/_wrappers";
import { useQueryClient } from "react-query";
import queryKeys from "tapis-hooks/systems/queryKeys";

const Layout: React.FC<{ appId: string; appVersion: string }> = ({
  appId,
  appVersion,
}) => {
  const { isLoading, error, isSuccess, submit, data } = useCreate();
  const { isLoading: isLoadingApps, error: errorApps, data: apps } = useList();

  const cookbookApp = cookbookApps.find(
    (app) => app.spec.id === appId && app.spec.version === appVersion
  );
  const existingApp = apps?.result?.find(
    (app) =>
      app.id === cookbookApp?.spec.id &&
      app.version === cookbookApp?.spec.version
  )
    ? true
    : false;

  const successText = (
    <div>
      Successfully created {cookbookApp?.name} {cookbookApp?.spec.version}
    </div>
  );
  const queryClient = useQueryClient();

  const button = (
    <SubmitWrapper
      isLoading={isLoading}
      error={error}
      success={isSuccess ? "App created" : undefined}
    >
      <Button
        color="primary"
        onClick={() => {
          if (!cookbookApp) return;
          submit(cookbookApp?.spec);

          queryClient.invalidateQueries(queryKeys.list);
        }}
        disabled={
          cookbookApp === undefined || isLoading || isLoadingApps || existingApp
        }
        successText={successText}
      >
        Add
      </Button>
    </SubmitWrapper>
  );

  const body = (
    <div style={{ flex: 1 }}>
      <LayoutHeader type={"sub-header"}>{cookbookApp?.name}</LayoutHeader>
      <LayoutHeader type={"sub-header"}>
        {isLoading || isLoadingApps ? (
          <LoadingSpinner placement="inplace" />
        ) : existingApp ? (
          <Link to={`/apps/${appId}/${appVersion}`}>View</Link>
        ) : (
          button
        )}
      </LayoutHeader>
      {cookbookApp && cookbookApp.spec && cookbookApp.spec.notes ? (
        <ReadmeViewer
          id={cookbookApp?.spec.id}
          version={cookbookApp?.spec.version}
          notes={cookbookApp?.spec.notes}
        />
      ) : (
        <span> No README </span>
      )}
    </div>
  );

  return <PageLayout right={body} />;
};

export default React.memo(Layout);
