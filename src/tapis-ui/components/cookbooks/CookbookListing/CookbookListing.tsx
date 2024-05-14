import React, { useCallback, useState } from "react";
import { Icon, InfiniteScrollTable } from "tapis-ui/_common";
import styles from "./CookbookListing.module.scss";
import { cookbookApp } from "fixtures/cookbooks.fixtures";
import { Apps } from "@tapis/tapis-typescript";
import { Column, Row } from "react-table";
import { Button, Spinner } from "reactstrap";
import { Link } from "react-router-dom";
import { useDelete, useList } from "tapis-hooks/apps";
import { QueryWrapper } from "tapis-ui/_wrappers";
import { useQueryClient } from "react-query";
import queryKeys from "tapis-hooks/apps/queryKeys";
import RemoveAppButton from "./RemoveAppButton";

type AppListItemProps = {
  app: Apps.TapisApp;
  onNavigate?: (app: Apps.TapisApp) => void;
};

const AppListingItem: React.FC<AppListItemProps> = ({ app, onNavigate }) => {
  return (
    <>
      <Link to={`/apps/${app.id}/${app.version}`}>{app.id}</Link>
    </>
  );
};

const AppListingButtons: React.FC<AppListItemProps> = ({ app }) => {
  if (app.id)
    return (
      <>
        {/*Share button*/}
        <RemoveAppButton appId={app.id} />
      </>
    );
  return null;
};

type AppListingProps = {
  onSelect?: (app: Apps.TapisApp) => void;
  onNavigate?: (app: Apps.TapisApp) => void;
  className?: string;
};

const CookbookListing: React.FC<AppListingProps> = ({
  onSelect,
  onNavigate,
  className,
}) => {
  const [selectedApp, setSelectedApp] = useState<Apps.TapisApp | null>(null);
  const { deleteFileAsync, reset } = useDelete();
  const selectWrapper = useCallback(
    (app: Apps.TapisApp) => {
      console.log(app);
      if (onSelect) {
        setSelectedApp(app);
        onSelect(app);
      }
    },
    [setSelectedApp, onSelect]
  );
  const { data, isLoading, error } = useList();
  const apps: Array<Apps.TapisApp> = data?.result ?? [];

  const tableColumns: Array<Column> = [
    {
      Header: "",
      accessor: "icon",
      Cell: (el) => <Icon name="data-files" />,
    },
    {
      Header: "Name",
      accessor: "id",
      Cell: (el) => (
        <AppListingItem app={el.row.original} onNavigate={onNavigate} />
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: (el) => <RemoveAppButton app={el.row.original} />,
    },
  ];

  // Maps the apps to row properties, such as classNames
  const getRowProps = (row: Row) => {
    const app = row.original as Apps.TapisApp;
    return {
      className: selectedApp?.id === app.id ? styles.selected : "",
      onclick: () => selectWrapper(app),
      "data-testid": app.id,
    };
  };

  return (
    <QueryWrapper isLoading={isLoading} error={error} className={className}>
      <InfiniteScrollTable
        className={styles["cookbook-list"]}
        tableColumns={tableColumns}
        tableData={apps}
        isLoading={false}
        noDataText={"No cookbooks found"}
        getRowProps={getRowProps}
      />
    </QueryWrapper>
  );
};

export default CookbookListing;
