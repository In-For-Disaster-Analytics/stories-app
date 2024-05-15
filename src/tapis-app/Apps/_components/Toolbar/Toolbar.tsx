import React, { useState, useCallback } from 'react';
import { Button } from 'reactstrap';
import { Icon } from 'tapis-ui/_common';
import styles from './Toolbar.module.scss';
import DeleteModal from './DeleteModal';
import { useLocation } from 'react-router-dom';
import { useDownload, usePermissions } from 'tapis-hooks/files';
import { useNotifications } from 'tapis-app/_components/Notifications';
import { useAppsSelect } from '../AppsContext';
import UploadModal from 'tapis-app/Apps/_components/Toolbar/UploadModal';

type ToolbarButtonProps = {
  text: string;
  icon: string;
  onClick: () => void;
  disabled: boolean;
};

export type ToolbarModalProps = {
  toggle: () => void;
};

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  text,
  icon,
  onClick,
  disabled = true,
  ...rest
}) => {
  return (
    <div>
      <Button
        disabled={disabled}
        onClick={onClick}
        className={styles['toolbar-btn']}
        {...rest}
      >
        <Icon name={icon}></Icon>
        <span> {text}</span>
      </Button>
    </div>
  );
};

const Toolbar: React.FC = () => {
  const [modal, setModal] = useState<string | undefined>(undefined);
  const { selectedApps } = useAppsSelect();
  const { pathname } = useLocation();
  const systemId = pathname.split('/')[2];
  const currentPath = pathname.split('/').splice(3).join('/');
  const { download } = useDownload();
  const { add } = useNotifications();

  const { data } = usePermissions({ systemId, path: currentPath });
  const permission = data?.result?.permission;

  const onDownload = useCallback(() => {
    selectedApps.forEach((file) => {
      // const params: DownloadStreamParams = {
      //   systemId,
      //   path: file.path ?? '',
      //   destination: file.name ?? 'tapisfile',
      // };
      // const isZip = file.type === 'dir';
      // if (isZip) {
      //   params.zip = true;
      //   params.destination = `${params.destination}.zip`;
      //   add({ icon: 'data-files', message: `Preparing download` });
      //   params.onStart = (response: Response) => {
      //     add({ icon: 'data-files', message: `Starting download` });
      //   };
      // }
      // download(params, {
      //   onError: isZip
      //     ? () => {
      //         add({
      //           icon: 'data-files',
      //           message: `Download failed`,
      //           status: 'ERROR',
      //         });
      //       }
      //     : undefined,
      // });
    });
  }, [selectedApps, add, download, systemId]);

  const toggle = () => {
    setModal(undefined);
  };
  return (
    <div id="file-operation-toolbar">
      {pathname !== '/files' && (
        <div className={styles['toolbar-wrapper']}>
          {/* <ToolbarButton
            text="Rename"
            icon="rename"
            disabled={
              selectedApps.length !== 1 ||
              permission !== Apps.FilePermissionPermissionEnum.Modify
            }
            onClick={() => setModal('rename')}
            aria-label="Rename"
          />
          <ToolbarButton
            text="Move"
            icon="move"
            disabled={
              selectedApps.length === 0 ||
              permission !== Apps.FilePermissionPermissionEnum.Modify
            }
            onClick={() => setModal('move')}
            aria-label="Move"
          />
          <ToolbarButton
            text="Copy"
            icon="copy"
            disabled={selectedApps.length === 0}
            onClick={() => setModal('copy')}
            aria-label="Copy"
          /> */}
          {/*
              <ToolbarButton
                text="Permissions"
                icon="gear"
                disabled={selectedApps.length !== 1 || permission !== Apps.FilePermissionPermissionEnum.Modify}
                onClick={() => setModal('permissions')}
              />
            */}
          {/* <ToolbarButton
            text="Transfers"
            icon="globe"
            disabled={false}
            onClick={() => setModal('transfer')}
          />
          <ToolbarButton
            text="Download"
            icon="download"
            disabled={selectedApps.length === 0}
            onClick={onDownload}
            aria-label="Download"
          /> */}
          <ToolbarButton
            text="Create"
            icon="add"
            disabled={false}
            onClick={() => {
              setModal('upload');
            }}
            aria-label="Add"
          />
          {/* <ToolbarButton
            text="Folder"
            icon="add"
            disabled={permission !== Apps.FilePermissionPermissionEnum.Modify}
            onClick={() => setModal('createdir')}
            aria-label="Add"
          /> */}
          <ToolbarButton
            text="Delete"
            icon="trash"
            disabled={selectedApps.length === 0}
            onClick={() => setModal('delete')}
            aria-label="Delete"
          />
          {/* {modal === 'createdir' && (
            <CreateDirModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
            />
          )}
          {modal === 'copy' && (
            <MoveCopyModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
              operation={Apps.MoveCopyRequestOperationEnum.Copy}
            />
          )}
          {modal === 'move' && (
            <MoveCopyModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
              operation={Apps.MoveCopyRequestOperationEnum.Move}
            />
          )}
          {modal === 'rename' && (
            <RenameModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
            />
          )}
          {modal === 'transfer' && (
            <TransferModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
            />
          )}
          {modal === 'upload' && (
            <UploadModal
              toggle={toggle}
              path={currentPath}
              systemId={systemId}
            />
          )}
          {modal === 'permissions' && (
            <PermissionsModal
              toggle={toggle}
              systemId={systemId}
              path={currentPath}
            />
          )} */}
          {modal === 'delete' && <DeleteModal toggle={toggle} />}
          {modal === 'upload' && <UploadModal toggle={toggle} />}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
