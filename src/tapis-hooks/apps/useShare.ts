import { useMutation, MutateOptions } from 'react-query';
import { Apps } from '@tapis/tapis-typescript';
import { useTapisConfig } from 'tapis-hooks/context';
import QueryKeys from './queryKeys';
import shareApp from 'tapis-api/apps/share';

export type ShareUserHookParams = {
  id: string;
  reqShareUpdate: Apps.ReqShareUpdate;
};

const useShare = () => {
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
  } = useMutation<Apps.RespBasic, Error, ShareUserHookParams>(
    [QueryKeys.list, basePath, jwt],
    (params) =>
      shareApp(
        { appId: params.id, reqShareUpdate: params.reqShareUpdate },
        basePath,
        jwt
      )
  );

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    shareApp: (
      params: ShareUserHookParams,
      options?: MutateOptions<Apps.RespBasic, Error, ShareUserHookParams>
    ) => {
      return mutate(params, options);
    },
    shareAppAsync: (
      params: ShareUserHookParams,
      options?: MutateOptions<Apps.RespBasic, Error, ShareUserHookParams>
    ) => mutateAsync(params, options),
  };
};

export default useShare;
