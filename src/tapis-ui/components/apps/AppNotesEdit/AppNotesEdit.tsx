import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { Apps } from '@tapis/tapis-typescript';
import { LayoutHeader, Tabs } from 'tapis-ui/_common';

import styles from './AppNotesEdit.module.scss';
import { ToolbarButton } from 'tapis-app/Apps/_components/Toolbar/Toolbar';
import Layout from 'tapis-app/Apps/AppsCreator/_Layout/Layout';

type AppDetailProps = {
  appId: string;
  appVersion: string;
};

type AppDetailNotes = {
  icon: string;
  label: string;
  helpUrl: string;
  category: string;
  helpText: string;
  queueFilter: string[];
  isInteractive: boolean;
  hideNodeCountAndCoresPerNode: boolean;
};

type AppEditorProps = {
  app: Apps.TapisApp;
};

const Toolbar = () => {
  return (
    <div className={styles['toolbar-wrapper']}>
      <ToolbarButton
        text="Save"
        icon="save"
        disabled={false}
        onClick={() => {}}
        aria-label="Save"
      />
    </div>
  );
};
const AppEditor = ({ app }: AppEditorProps) => {
  const tabs: { [name: string]: React.ReactNode } = {};

  const notes = app.notes as AppDetailNotes;
  const [text, setText] = React.useState(notes.helpText);

  const editorTab = (
    <Editor
      height="90vh"
      defaultLanguage="markdown"
      options={
        {
          wordWrap: 'on',
          minimap: { enabled: false },
        } as any
      }
      defaultValue={text}
      onChange={(value) => value && setText(value)}
    />
  );

  const previewTab = <Markdown>{text}</Markdown>;

  tabs['Editor'] = editorTab;
  tabs['Preview'] = previewTab;

  return (
    <div>
      <LayoutHeader type={'sub-header'}>
        {app.id} - {app.version}
        <Toolbar />
      </LayoutHeader>
      <Tabs tabs={tabs} />
    </div>
  );
};

const AppEdit: React.FC<AppDetailProps> = ({ appId, appVersion }) => {
  const { data, isLoading, error } = useAppDetail({ appId, appVersion });
  const app = data?.result;
  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      {app ? <AppEditor app={app} /> : 'No notes found'}
    </QueryWrapper>
  );
};

export default AppEdit;
