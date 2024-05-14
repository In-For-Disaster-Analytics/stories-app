import React from 'react';
import { AppsOpEventStatusEnum } from '../../_hooks/useAppsOperations';
import { LoadingSpinner, Icon } from 'tapis-ui/_common';

const AppsOperationStatus: React.FC<{ status: AppsOpEventStatusEnum }> = ({
  status,
}) => {
  switch (status) {
    case AppsOpEventStatusEnum.loading:
      return <LoadingSpinner placement="inline" />;
    case AppsOpEventStatusEnum.success:
      return <Icon name="approved-reverse" className="success" />;
    case AppsOpEventStatusEnum.error:
      return <Icon name="alert" />;
  }
  return <div>Unknown status!</div>;
};

export default AppsOperationStatus;
