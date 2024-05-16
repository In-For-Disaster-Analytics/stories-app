import React from 'react';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { useDetail as useAppDetail } from 'tapis-hooks/apps';

type AppDetailProps = {
  appId: string;
  appVersion: string;
};

const AppDetail: React.FC<AppDetailProps> = ({ appId, appVersion }) => {
  const { data, isLoading, error } = useAppDetail(
    { appId, appVersion },
    { refetchOnWindowFocus: true }
  );
  const app = data?.result;

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      {app && JSON.stringify(app)}
    </QueryWrapper>
  );
};

export default AppDetail;
