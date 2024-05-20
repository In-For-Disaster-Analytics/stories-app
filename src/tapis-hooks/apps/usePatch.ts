import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { Apps } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks';
import QueryKeys from './queryKeys';
import create from 'tapis-api/apps/create';
import patch from 'tapis-api/apps/patch';

const usePatch = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || '';

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, submit helper is called to perform the operation
  const {
    mutate,
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
  } = useMutation<Apps.RespResourceUrl, Error, Apps.PatchAppRequest>(
    [QueryKeys, basePath, jwt],
    (request: Apps.PatchAppRequest) => patch(request, basePath, jwt)
  );

  // We want this hook to automatically reset if a different appId or appVersion
  // is passed to it. This eliminates the need to reset it inside the TSX component
  useEffect(() => reset(), [reset]);

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    createAsync: (
      request: Apps.PatchAppRequest,
      // react-query options to allow callbacks such as onSuccess
      options?: any
    ) => {
      // Call mutate to trigger a single post-like API operation
      return mutateAsync(request, options);
    },
    submit: (request: Apps.PatchAppRequest) => {
      // Call mutate to trigger a single post-like API operation
      return mutate(request);
    },
  };
};

export default usePatch;
