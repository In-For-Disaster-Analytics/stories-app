import React from 'react';
import { AppsContextType } from '.';

export const filesContext: AppsContextType = {
  selectedApps: [],
  setSelectedApps: () => {},
};

const AppsContext: React.Context<AppsContextType> =
  React.createContext<AppsContextType>(filesContext);

export default AppsContext;
