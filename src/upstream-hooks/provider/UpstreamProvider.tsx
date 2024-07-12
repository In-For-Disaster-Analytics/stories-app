import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Authenticator } from '@tapis/tapis-typescript';
import UpstreamContext, {
  UpstreamContextType,
} from '../context/UpstreamContext';

interface UpstreamProviderProps {
  token?: Authenticator.NewAccessTokenResponse;
  basePath: string;
}

const UpstreamProvider: React.FC<
  React.PropsWithChildren<UpstreamProviderProps>
> = ({ token, basePath, children }) => {
  // Provide a context state for the rest of the application, including
  // a way of modifying the state
  const contextValue: UpstreamContextType = {
    basePath,
  };

  // react-query client
  const queryClient = new QueryClient();

  return (
    <UpstreamContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </UpstreamContext.Provider>
  );
};

export default UpstreamProvider;
