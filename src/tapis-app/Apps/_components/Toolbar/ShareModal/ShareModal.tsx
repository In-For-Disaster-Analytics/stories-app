import { useEffect, useCallback, useState } from 'react';
import { Button } from 'reactstrap';
import { DropdownSelector, FormikInput, GenericModal } from 'tapis-ui/_common';
import { SubmitWrapper } from 'tapis-ui/_wrappers';
import { ToolbarModalProps } from '../Toolbar';
import { focusManager } from 'react-query';
import { Column } from 'react-table';
import styles from './ShareModal.module.scss';
import { useAppsSelect } from '../../AppsContext';
import { Apps } from '@tapis/tapis-typescript';
import useAppsOperations from '../_hooks';
import AppsOperationStatus from '../_components';
import useSharePublic, {
  ShareHookParams,
} from 'tapis-hooks/apps/useSharePublic';
import { AppListingTable } from 'tapis-ui/components/apps/AppListing';
import useUnsharePublic from 'tapis-hooks/apps/useUnsharePublic';
import useShare, { ShareUserHookParams } from 'tapis-hooks/apps/useShare';
import { Form, Formik } from 'formik';
import { MuiChipsInput } from 'tapis-ui/_common/MuiChipsInput';

const ShareModel: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const { selectedApps, unselect } = useAppsSelect();
  const { shareAppPublicAsync, reset } = useSharePublic();
  const { unShareAppPublicAsync, reset: resetUnshare } = useUnsharePublic();
  const { shareAppAsync, reset: resetShare } = useShare();
  const [isPublishedApp, setIsPublishedApp] = useState(false);
  const getAllUsers = selectedApps.map((app) => app.sharedWithUsers);
  const [users, setUsers] = useState<Array<string>>(
    getAllUsers.filter(String).flat() as Array<string>
  );
  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    resetUnshare();
  }, [resetUnshare]);

  useEffect(() => {
    resetShare();
  }, [resetShare]);

  const onComplete = useCallback(() => {
    // Calling the focus manager triggers react-query's
    // automatic refetch on window focus
    focusManager.setFocused(true);
  }, []);

  const {
    run: runSharePublic,
    state: stateSharePublic,
    isLoading: isLoadingSharePublic,
    isSuccess: isSuccessSharePublic,
    error: errorSharePublic,
  } = useAppsOperations<ShareHookParams, Apps.RespChangeCount>({
    fn: shareAppPublicAsync,
    onComplete,
  });

  const {
    run: runUnshare,
    state: stateUnshare,
    isLoading: isLoadingUnshare,
    isSuccess: isSuccessUnshare,
    error: errorUnshare,
  } = useAppsOperations<ShareHookParams, Apps.RespChangeCount>({
    fn: unShareAppPublicAsync,
    onComplete,
  });

  const {
    run: runShare,
    state: stateShare,
    isLoading: isLoadingShare,
    isSuccess: isSuccessShare,
    error: errorShare,
  } = useAppsOperations<ShareUserHookParams, Apps.RespChangeCount>({
    fn: shareAppAsync,
    onComplete,
  });

  const onSubmit = useCallback(() => {
    const operations: Array<ShareHookParams> = selectedApps.map((app) => ({
      id: app.id!,
    }));
    if (isPublishedApp) {
      runSharePublic(operations);
    }
    if (!isPublishedApp) {
      runUnshare(operations);
    }
    if (users.length > 0) {
      const userOperations: Array<ShareUserHookParams> = selectedApps.map(
        (app) => ({
          id: app.id!,
          reqShareUpdate: {
            users,
          },
        })
      );
      runShare(userOperations);
    }
  }, [selectedApps, runSharePublic, runUnshare]);

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
        if (!stateSharePublic[file.id!]) {
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
        return (
          <AppsOperationStatus status={stateSharePublic[file.id!].status} />
        );
      },
    },
  ];

  const initialValues = {
    visibility: 'private',
  };

  return (
    <GenericModal
      toggle={() => {
        toggle();
        unselect(selectedApps);
      }}
      title={`Share apps`}
      body={
        <div>
          <div className={styles['files-list-container']}>
            <AppListingTable
              apps={selectedApps}
              fields={['updated']}
              appendColumns={statusColumn}
              className={styles['file-list-table']}
            />
          </div>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form id="share-form">
              <h3> General access </h3>
              <DropdownSelector
                type={undefined}
                onChange={(e: any) => {
                  const value = e.target.value;
                  if (value === 'public') {
                    setIsPublishedApp(true);
                  }
                  if (value === 'private') {
                    setIsPublishedApp(false);
                  }
                }}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </DropdownSelector>
              <h3> Add users </h3>
              <MuiChipsInput value={users} onChange={setUsers} />
            </Form>
          </Formik>
        </div>
      }
      footer={
        <SubmitWrapper
          isLoading={false}
          error={errorSharePublic || errorShare || errorUnshare}
          success={
            isSuccessSharePublic || isSuccessUnshare ? `Visibility changed` : ''
          }
          reverse={true}
        >
          <Button
            color="primary"
            disabled={
              isLoadingSharePublic ||
              isSuccessSharePublic ||
              isLoadingShare ||
              isSuccessShare ||
              isLoadingUnshare ||
              isSuccessUnshare ||
              selectedApps.length === 0
            }
            aria-label="Submit"
            onClick={onSubmit}
          >
            Confirm ({selectedApps.length})
          </Button>
          {!isSuccessSharePublic && (
            <Button
              color="danger"
              disabled={
                isLoadingSharePublic ||
                isSuccessSharePublic ||
                selectedApps.length === 0
              }
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

export default ShareModel;
