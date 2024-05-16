import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';

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

const AppDetail: React.FC<AppDetailProps> = ({ appId, appVersion }) => {
  const { data, isLoading, error } = useAppDetail(
    { appId, appVersion },
    { refetchOnWindowFocus: true }
  );
  const app = data?.result;
  const notes = app?.notes as AppDetailNotes;

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      {notes && notes.helpText ? notes.helpText : 'No notes found'}
    </QueryWrapper>
  );
};

export default AppDetail;
