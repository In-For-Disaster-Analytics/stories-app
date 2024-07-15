import { useEffect, useCallback, useState } from 'react';
import { Button, Container, FormGroup } from 'reactstrap';
import { DropdownSelector, FormikInput, GenericModal } from 'tapis-ui/_common';
import { QueryWrapper, SubmitWrapper } from 'tapis-ui/_wrappers';
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
import { useList } from 'upstream-hooks/projects';
import ProjectSelector from './components/ProjectSelector';
import UserSelector from './components/UserSelector';
import { remove } from 'js-cookie';
import unShareApp from 'tapis-api/apps/unShare';
import useUnShare from 'tapis-hooks/apps/useUnShare';

const ShareModel: React.FC<ToolbarModalProps> = ({ toggle }) => {
  const { selectedApps, unselect } = useAppsSelect();
  const { shareAppPublicAsync, reset } = useSharePublic();
  const { unShareAppPublicAsync, reset: resetUnshare } = useUnsharePublic();
  const { shareAppAsync, reset: resetShare } = useShare();
  const { unShareAppAsync, reset: resetUnShare } = useUnShare();
  const [isPublishedApp, setIsPublishedApp] = useState(false);
  const getAllUsers = selectedApps.map((app) => app.sharedWithUsers);
  const [existingUsers, setExistingUsers] = useState<Array<string>>(
    getAllUsers.filter(String).flat() as Array<string>
  );
  const [newUsers, setNewUsers] = useState<Array<string>>([]);
  const [usersFromProjects, setUsersFromProjects] = useState<Array<string>>([]);
  const [removedUsers, setRemovedUsers] = useState<Array<string>>([]);
  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    resetUnshare();
  }, [resetUnshare]);

  useEffect(() => {
    resetShare();
  }, [resetShare]);

  useEffect(() => {
    resetUnShare();
  }, [resetUnShare]);

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
    run: runUnsharePublic,
    state: stateUnsharePublic,
    isLoading: isLoadingUnsharePublic,
    isSuccess: isSuccessUnsharePublic,
    error: errorUnsharePublic,
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

  const {
    run: unShare,
    state: stateUnshare,
    isLoading: isLoadingUnshare,
    isSuccess: isSuccessUnshare,
    error: errorUnshare,
  } = useAppsOperations<ShareUserHookParams, Apps.RespChangeCount>({
    fn: unShareAppAsync,
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
      runUnsharePublic(operations);
    }
    const newMergedUsers = [...usersFromProjects, ...newUsers];
    if (newMergedUsers.length > 0) {
      //merge users and usersFromProjects
      const mergedUsers = [...existingUsers, ...usersFromProjects, ...newUsers];
      const userOperations: Array<ShareUserHookParams> = selectedApps.map(
        (app) => ({
          id: app.id!,
          reqShareUpdate: {
            users: mergedUsers,
          },
        })
      );
      runShare(userOperations);
    }
    if (removedUsers.length > 0) {
      const userOperations: Array<ShareUserHookParams> = selectedApps.map(
        (app) => ({
          id: app.id!,
          reqShareUpdate: {
            users: removedUsers,
          },
        })
      );
      unShare(userOperations);
    }
  }, [selectedApps, runSharePublic, runUnsharePublic]);

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
          <div>
            The following actions will be applied to the selected apps:
            <ul>
              <li>Unshare: {removedUsers.length} users </li>
              <li>Share: {newUsers.length} users </li>
            </ul>
          </div>
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
              <FormGroup>
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
              </FormGroup>
              <FormGroup>
                <h3> Add new users </h3>
                <MuiChipsInput
                  size="small"
                  value={newUsers}
                  onChange={setNewUsers}
                />
              </FormGroup>
              <FormGroup>
                <h3> Add new an allocation </h3>
                <ProjectSelector
                  users={usersFromProjects}
                  setUsers={setUsersFromProjects}
                />
              </FormGroup>
              <UserSelector
                initialUsers={existingUsers}
                removedUsers={removedUsers}
                setRemovedUsers={setRemovedUsers}
              />
            </Form>
          </Formik>
        </div>
      }
      footer={
        <SubmitWrapper
          isLoading={false}
          error={errorSharePublic || errorShare || errorUnsharePublic}
          success={
            isSuccessSharePublic || isSuccessUnsharePublic
              ? `Visibility changed`
              : ''
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
              isLoadingUnsharePublic ||
              isSuccessUnsharePublic ||
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
