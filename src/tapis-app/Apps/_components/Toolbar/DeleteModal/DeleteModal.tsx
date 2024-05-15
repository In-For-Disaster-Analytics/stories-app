import { useEffect, useCallback } from 'react';
import { Button } from 'reactstrap';
import { GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { FileListingTable } from 'tapis-ui/components/files/FileListing/FileListing';
import { ToolbarModalProps } from '../Toolbar';
import { focusManager } from 'react-query';
import { Column } from 'react-table';
import styles from './DeleteModal.module.scss';
import { useAppsSelect } from '../../AppsContext';
import { Apps } from '@tapis/tapis-typescript';
import useDelete, { DeleteHookParams } from 'tapis-hooks/apps/useDelete';
import useAppsOperations from '../_hooks';
import AppsOperationStatus from '../_components';
import { AppListingTable } from 'tapis-ui/components/apps/AppListing';

const DeleteModal: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const { selectedApps, unselect } = useAppsSelect();
  const { deleteAppAsync, reset } = useDelete();

  useEffect(() => {
    reset();
  }, [reset]);

  const onComplete = useCallback(() => {
    // Calling the focus manager triggers react-query's
    // automatic refetch on window focus
    focusManager.setFocused(true);
  }, []);

  const { run, state, isLoading, isSuccess, error } = useAppsOperations<
    DeleteHookParams,
    Apps.RespChangeCount
  >({
    fn: deleteAppAsync,
    onComplete,
  });

  const onSubmit = useCallback(() => {
    const operations: Array<DeleteHookParams> = selectedApps.map((app) => ({
      id: app.id!,
    }));
    run(operations);
  }, [selectedApps, run]);

  const removeApps = useCallback(
    (file: Apps.TapisApp) => {
      unselect([file]);
      if (selectedApps.length === 1) {
        toggle();
      }
    },
    [selectedApps, toggle, unselect]
  );

  const statusColumn: Array<Column> = [
    {
      Header: '',
      id: 'deleteStatus',
      Cell: (el) => {
        const file = selectedApps[el.row.index];
        if (!state[file.id!]) {
          return (
            <span
              className={styles['remove-file']}
              onClick={() => {
                removeApps(selectedApps[el.row.index]);
              }}
            >
              &#x2715;
            </span>
          );
        }
        return <AppsOperationStatus status={state[file.id!].status} />;
      },
    },
  ];

  return (
    <GenericModal
      toggle={() => {
        toggle();
        unselect(selectedApps);
      }}
      title={`Delete apps`}
      body={
        <div>
          <h3>Deleting apps</h3>
          <div className={styles['files-list-container']}>
            <AppListingTable
              apps={selectedApps}
              fields={['updated']}
              appendColumns={statusColumn}
              className={styles['file-list-table']}
            />
          </div>
        </div>
      }
      footer={
        <SubmitWrapper
          isLoading={false}
          error={error}
          success={isSuccess ? `Successfully deleted files` : ''}
          reverse={true}
        >
          <Button
            color="primary"
            disabled={isLoading || isSuccess || selectedApps.length === 0}
            aria-label="Submit"
            onClick={onSubmit}
          >
            Confirm delete ({selectedApps.length})
          </Button>
          {!isSuccess && (
            <Button
              color="danger"
              disabled={isLoading || isSuccess || selectedApps.length === 0}
              aria-label="Cancel"
              onClick={() => {
                toggle();
              }}
            >
              Cancel
            </Button>
          )}
        </SubmitWrapper>
      }
    />
  );
};

export default DeleteModal;
