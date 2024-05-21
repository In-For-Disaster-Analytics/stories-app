import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Markdown from 'react-markdown';
import { LayoutHeader } from 'tapis-ui/_common';
import styles from './AppDetail.module.scss';
import { Link } from 'react-router-dom';
import { ToolbarButton } from 'tapis-app/Apps/_components/Toolbar/Toolbar';

type AppDetailProps = {
  appId: string;
  appVersion: string;
};

const Viewer = ({ text }: { text: string }) => {
  return <Markdown>{text}</Markdown>;
};

const AppDetail: React.FC<AppDetailProps> = ({ appId, appVersion }) => {
  const { data, isLoading, error } = useAppDetail(
    { appId, appVersion },
    { refetchOnWindowFocus: true }
  );
  const app = data?.result;
  const notes = app?.notes as AppDetailNotes;
  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <LayoutHeader type={'sub-header'}>
        {notes && notes.label ? notes.label : appId} - {appVersion}
        <div className={styles['toolbar-wrapper']}>
          <Link
            to={`/apps/${appId}/${appVersion}/edit`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ToolbarButton
              text="Edit"
              icon="edit-document"
              disabled={false}
              onClick={async () => {}}
              aria-label="Save"
            ></ToolbarButton>
          </Link>
          <a
            href={`https://ptdatax.tacc.utexas.edu/workbench/applications/${appId}?appVersion=${appVersion}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ToolbarButton
              text="Run"
              icon="jobs"
              disabled={false}
              onClick={async () => {}}
              aria-label="Save"
            ></ToolbarButton>
          </a>
        </div>
      </LayoutHeader>
      <p> Docker Image: {app?.containerImage}</p>
      {notes && notes.helpTextMarkdown ? (
        <Viewer text={notes.helpTextMarkdown} />
      ) : (
        (notes && notes.helpText) ||
        (notes && notes.helpTextHtml) ||
        'No notes found'
      )}
    </QueryWrapper>
  );
};

export default AppDetail;
