import React from 'react';

export type UpstreamContextType = {
  basePath: string;
};

export const authContext: UpstreamContextType = {
  basePath: '',
};

const UpstreamContext: React.Context<UpstreamContextType> =
  React.createContext<UpstreamContextType>(authContext);

export default UpstreamContext;
