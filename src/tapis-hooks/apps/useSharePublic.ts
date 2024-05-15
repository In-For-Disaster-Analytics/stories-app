import { useMutation, MutateOptions } from 'react-query';
import { Apps } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks/context';
import QueryKeys from './queryKeys';
import shareAppPublic from 'tapis-api/apps/sharePublic';

export type ShareHookParams = {
  id: string;
};

const useSharePublic = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || '';

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, _share helper is called to perform the operation
  const {
    mutate,
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
  } = useMutation<Apps.RespBasic, Error, ShareHookParams>(
    [QueryKeys.sharePublic, basePath, jwt],
    (params) => shareAppPublic(params.id, basePath, jwt)
  );

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    shareAppPublic: (
      params: ShareHookParams,
      options?: MutateOptions<Apps.RespBasic, Error, ShareHookParams>
    ) => {
      return mutate(params, options);
    },
    shareAppPublicAsync: (
      params: ShareHookParams,
      options?: MutateOptions<Apps.RespBasic, Error, ShareHookParams>
    ) => mutateAsync(params, options),
  };
};

export default useSharePublic;
