import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Editor from '@monaco-editor/react';
import { Button } from 'reactstrap';
import Markdown from 'react-markdown';
import { set } from 'js-cookie';

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

const AppEdit: React.FC<AppDetailProps> = ({ appId, appVersion }) => {
  const { data, isLoading, error } = useAppDetail(
    { appId, appVersion },
    { refetchOnWindowFocus: true }
  );
  const app = data?.result;
  const notes = app?.notes as AppDetailNotes;
  const [notesContent, setNotesContent] = React.useState(notes.helpText);

  const [toggle, setToggle] = React.useState('editor');

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      {notes && notes.helpText ? (
        <>
          <Button color="primary" onClick={() => setToggle('editor')}>
            Editor Mode
          </Button>
          <Button color="primary" onClick={() => setToggle('preview')}>
            Preview Mode
          </Button>
          {toggle === 'preview' ? (
            <Markdown>{notesContent}</Markdown>
          ) : (
            <Editor
              height="90vh"
              defaultLanguage="markdown"
              defaultValue={notesContent}
              onChange={(value) => value && setNotesContent(value)}
            />
          )}
        </>
      ) : (
        'No notes found'
      )}
    </QueryWrapper>
  );
};

export default AppEdit;
