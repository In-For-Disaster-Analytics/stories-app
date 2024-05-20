import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';
import Markdown from 'react-markdown';

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
