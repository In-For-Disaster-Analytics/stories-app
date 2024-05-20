import React from 'react';
import { QueryWrapper, SubmitWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Editor from '@monaco-editor/react';
import Markdown from 'react-markdown';
import { Apps } from '@tapis/tapis-typescript';
import { LayoutHeader, Tabs } from 'tapis-ui/_common';
import styles from './AppNotesEdit.module.scss';
import { ToolbarButton } from 'tapis-app/Apps/_components/Toolbar/Toolbar';
import usePatch from 'tapis-hooks/apps/usePatch';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { useTapisConfig } from 'tapis-hooks';

type AppDetailProps = {
  appId: string;
  appVersion: string;
};

async function convertMarkdownToHtml(doc: string) {
  const file = await unified()
    .use(remarkParse) // Parse Markdown to MDAST
    .use(remarkRehype) // Transform MDAST to HAST
    .use(rehypeStringify) // Stringify HAST to HTML
    .process(doc);
  return String(file);
}

type AppDetailNotes = {
  icon: string;
  label: string;
  helpUrl: string;
  category: string;
  helpText: string;
  helpTextHtml: string;
  helpTextMarkdown: string;
  queueFilter: string[];
  isInteractive: boolean;
  hideNodeCountAndCoresPerNode: boolean;
};

type AppEditorProps = {
  app: Apps.TapisApp;
};

const AppEditor = ({ app }: AppEditorProps) => {
  const tabs: { [name: string]: React.ReactNode } = {};

  const { submit, isLoading, error, isSuccess, reset } = usePatch();
  const notes = app.notes as AppDetailNotes;

  const initText = notes.helpTextMarkdown;
  const [text, setText] = React.useState(initText);

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

  const { claims } = useTapisConfig();
  const isCurrentUser = (username: string) =>
    username === claims['tapis/username'];
  const hasPermissions: boolean =
    app.owner === undefined ? false : isCurrentUser(app.owner);

  return (
    <div>
      <LayoutHeader type={'sub-header'}>
        {app.id} - {app.version}
        <SubmitWrapper
          isLoading={isLoading}
          error={error}
          success={isSuccess ? `Successfully updated notes` : ''}
          reverse={true}
        >
          <div className={styles['toolbar-wrapper']}>
            <ToolbarButton
              text={hasPermissions ? 'Save' : 'No Permissions'}
              icon="save"
              disabled={!hasPermissions}
              onClick={async () => {
                const helpText = await convertMarkdownToHtml(text);
                const helpTextHtml = helpText;
                const helpTextMarkdown = text;
                submit({
                  appId: app.id as string,
                  appVersion: app.version as string,
                  reqPatchApp: {
                    notes: {
                      ...notes,
                      helpText,
                      helpTextMarkdown,
                      helpTextHtml,
                    },
                  },
                });
              }}
              aria-label="Save"
            />
          </div>
        </SubmitWrapper>
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
      {app && app.id !== undefined && app.version !== undefined ? (
        <AppEditor app={app} />
      ) : (
        'No notes found'
      )}
    </QueryWrapper>
  );
};

export default AppEdit;
