import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Editor from '@monaco-editor/react';
import { Button } from 'reactstrap';
import Markdown from 'react-markdown';
import { set } from 'js-cookie';
import { text } from '@fortawesome/fontawesome-svg-core';
import { Apps } from '@tapis/tapis-typescript';
import { Tabs } from 'tapis-ui/_common';

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

const AppEditor = ({ app }: AppEditorProps) => {
  const tabs: { [name: string]: React.ReactNode } = {};

  const notes = app.notes as AppDetailNotes;
  const [text, setText] = React.useState(notes.helpText);

  const editorTab = (
    <Editor
      height="90vh"
      defaultLanguage="markdown"
      defaultValue={text}
      onChange={(value) => value && setText(value)}
    />
  );

  const previewTab = <Markdown>{text}</Markdown>;

  tabs['Editor'] = editorTab;
  tabs['Preview'] = previewTab;

  return (
    <div>
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
