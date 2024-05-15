import React, { useCallback, useState, useMemo } from 'react';
import { useList } from 'tapis-hooks/apps';
import { Apps } from '@tapis/tapis-typescript';
import { Icon, InfiniteScrollTable } from 'tapis-ui/_common';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { Row, Column, CellProps } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faSquare as filledSquare,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import styles from './CookbookListing.module.scss';

export type OnSelectCallback = (apps: Array<Apps.TapisApp>) => any;
export type OnNavigateCallback = (app: Apps.TapisApp) => any;

// interface AppListingDirProps {
//   app: Apps.TapisApp;
//   onNavigate?: OnNavigateCallback;
//   location?: string;
// }

// const AppListingDir: React.FC<AppListingDirProps> = ({
//   app,
//   onNavigate = undefined,
//   location = undefined,
// }) => {
//   if (location) {
//     return (
//       <NavLink to={`${location}${app.id ?? ''}/`} className={styles.dir}>
//         {app.id}/
//       </NavLink>
//     );
//   }
//   if (onNavigate) {
//     return (
//       <Button
//         color="link"
//         className={styles.link}
//         onClick={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           onNavigate(app);
//         }}
//         data-testid={`btn-link-${app.id}`}
//       >
//         {app.id}/
//       </Button>
//     );
//   }
//   return <span>{app.name}/</span>;
// };

type AppListingCheckboxCell = {
  selected: boolean;
};

/* eslint-disable-next-line */
export const AppListingCheckboxCell: React.FC<AppListingCheckboxCell> =
  React.memo(({ selected }) => {
    return (
      <span className="fa-layers fa-fw">
        <FontAwesomeIcon icon={filledSquare} color="white" />
        <FontAwesomeIcon
          icon={selected ? faCheckSquare : faSquare}
          color="#9D85EF"
        />
        <FontAwesomeIcon icon={faSquare} color="#707070" />
      </span>
    );
  });

interface AppListingItemProps {
  app: Apps.TapisApp;
  onNavigate?: OnNavigateCallback;
  location?: string;
}

const AppListingName: React.FC<AppListingItemProps> = ({
  app,
  onNavigate = undefined,
  location = undefined,
}) => {
  return <>{app.id}</>;
};

export type SelectMode = {
  mode: 'none' | 'single' | 'multi';
  // If undefined, allowed selectable app types will be treated as [ "app", "dir" ]
  types?: Array<'dir' | 'app'>;
};

type AppListingTableProps = {
  apps: Array<Apps.TapisApp>;
  prependColumns?: Array<Column>;
  appendColumns?: Array<Column>;
  getRowProps?: (row: Row) => any;
  onInfiniteScroll?: () => any;
  isLoading?: boolean;
  onNavigate?: OnNavigateCallback;
  location?: string;
  className?: string;
  selectMode?: SelectMode;
  fields?: Array<'updated'>;
};

export const AppListingTable: React.FC<AppListingTableProps> = React.memo(
  ({
    apps,
    prependColumns = [],
    appendColumns = [],
    getRowProps,
    onInfiniteScroll,
    isLoading,
    onNavigate,
    location,
    className,
    selectMode,
    fields,
  }) => {
    const styleName =
      selectMode?.mode !== 'none' ? 'app-list-select' : 'app-list';

    const tableColumns: Array<Column> = [
      ...prependColumns,
      {
        Header: '',
        accessor: 'type',
        Cell: (el) => <Icon name={el.value === 'app' ? 'app' : 'folder'} />,
      },
      {
        Header: 'Id',
        Cell: (el) => (
          <AppListingName
            app={el.row.original}
            onNavigate={onNavigate}
            location={location}
          />
        ),
      },
    ];

    // if (fields?.some((field) => field === 'size')) {
    //   tableColumns.push({
    //     Header: 'Size',
    //     accessor: 'size',
    //     Cell: (el) => <span>{sizeFormat(el.value)}</span>,
    //   });
    // }

    if (fields?.some((field) => field === 'updated')) {
      tableColumns.push({
        Header: 'Last Modified',
        accessor: 'updated',
        Cell: (el) => (
          <span>{el.value}</span>
          // <span>{formatDateTimeFromValue(new Date(el.value))}</span>
        ),
      });
    }

    tableColumns.push(...appendColumns);

    return (
      <InfiniteScrollTable
        className={`${className} ${styles[styleName]}`}
        tableColumns={tableColumns}
        tableData={apps}
        onInfiniteScroll={onInfiniteScroll}
        isLoading={isLoading}
        noDataText="No apps found"
        getRowProps={getRowProps}
      />
    );
  }
);

type AppSelectHeaderProps = {
  onSelectAll: () => void;
  onUnselectAll: () => void;
  selectedAppDict: SelectAppDictType;
};

type SelectAppDictType = { [path: string]: boolean };

const AppSelectHeader: React.FC<AppSelectHeaderProps> = ({
  onSelectAll,
  onUnselectAll,
  selectedAppDict,
}) => {
  const [checked, setChecked] = useState(false);
  const allSelected = Object.values(selectedAppDict).some(
    (value) => value === false
  );
  const onClick = useCallback(() => {
    if (checked && !allSelected) {
      setChecked(false);
      onUnselectAll();
    } else {
      setChecked(true);
      onSelectAll();
    }
  }, [checked, setChecked, onSelectAll, onUnselectAll, allSelected]);

  return (
    <span
      className={styles['select-all']}
      onClick={onClick}
      data-testid="select-all"
    >
      <AppListingCheckboxCell selected={checked && !allSelected} />
    </span>
  );
};

interface AppListingProps {
  onSelect?: OnSelectCallback;
  onUnselect?: OnSelectCallback;
  onNavigate?: OnNavigateCallback;
  className?: string;
  // fields?: Array<'size' | 'updated'>;
  fields?: Array<'updated'>;
  selectedApps?: Array<Apps.TapisApp>;
  selectMode?: SelectMode;
}

const AppListing: React.FC<AppListingProps> = ({
  onSelect = undefined,
  onUnselect = undefined,
  onNavigate = undefined,
  className,
  // fields = ['size', 'updated'],
  fields = ['updated'],
  selectedApps = [],
  selectMode,
}) => {
  const { isLoading, error, data } = useList();

  const apps: Array<Apps.TapisApp> = data?.result ?? [];

  const selectedAppDict: SelectAppDictType = React.useMemo(() => {
    const result: SelectAppDictType = {};
    const selectedDict: SelectAppDictType = {};
    selectedApps.forEach((app) => {
      selectedDict[app.id ?? ''] = true;
    });
    apps?.forEach((app) => {
      result[app.id ?? ''] = selectedDict[app.id ?? ''] ?? false;
    });
    return result;
  }, [selectedApps, apps]);

  const prependColumns = selectMode?.types?.length
    ? [
        {
          Header: (
            <AppSelectHeader
              onSelectAll={() => onSelect && onSelect(apps ?? [])}
              onUnselectAll={() => onUnselect && onUnselect(apps ?? [])}
              selectedAppDict={selectedAppDict}
            />
          ),
          id: 'multiselect',
          Cell: (el: React.PropsWithChildren<CellProps<{}, any>>) => (
            <AppListingCheckboxCell
              selected={
                selectedAppDict[(el.row.original as Apps.TapisApp).id ?? '']
              }
            />
          ),
        },
      ]
    : [];

  const appSelectCallback = useCallback(
    (app: Apps.TapisApp) => {
      // if (!selectMode?.types?.some((allowed) => allowed === app.type)) {
      //   return;
      // }
      console.log('appSelectCallback' + app.id);
      if (selectedAppDict[app.id ?? ''] && onUnselect) {
        onUnselect([app]);
      } else {
        console.log('onSelect' + app.id);
        onSelect && onSelect([app]);
      }
    },
    [selectMode, onUnselect, selectedAppDict, onSelect]
  );

  // Maps rows to row properties, such as classNames
  const getRowProps = (row: Row) => {
    const app: Apps.TapisApp = row.original as Apps.TapisApp;
    return {
      onClick: () => appSelectCallback(app),
      'data-testid': app.id,
      className: selectedAppDict[app.id ?? ''] ? styles.selected : '',
    };
  };

  return (
    <QueryWrapper isLoading={isLoading} error={error} className={className}>
      <AppListingTable
        apps={apps}
        prependColumns={prependColumns}
        // onInfiniteScroll={infiniteScrollCallback}
        // isLoading={isFetchingNextPage}
        getRowProps={getRowProps}
        onNavigate={onNavigate}
        fields={fields}
        selectMode={selectMode}
      />
    </QueryWrapper>
  );
};

export default AppListing;
