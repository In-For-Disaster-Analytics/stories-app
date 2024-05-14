import React, { useState } from 'react';
import { Apps } from '@tapis/tapis-typescript';
import { AppsContextType } from '.';
import AppsContext from './AppsContext';

const AppsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedApps, setSelectedApps] = useState<Array<Apps.TapisApp>>([]);

  // Provide a context state for the rest of the application, including
  // a way of modifying the state
  const contextValue: AppsContextType = {
    selectedApps,
    setSelectedApps,
  };

  return (
    <AppsContext.Provider value={contextValue}>{children}</AppsContext.Provider>
  );
};

export default AppsProvider;
