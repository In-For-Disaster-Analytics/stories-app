import { useMutation, MutateOptions } from "react-query";
import { Apps } from "@tapis/tapis-typescript";
import { deleteApp } from "tapis-api/apps";
import { useTapisConfig } from "tapis-hooks/context";
import QueryKeys from "./queryKeys";

type DeleteAppHookParams = {
  appId: string;
};

const useDelete = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || "";

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, _delete helper is called to perform the operation
  const {
    mutate,
    mutateAsync,
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
  } = useMutation<Apps.RespChangeCount, Error, DeleteAppHookParams>(
    [QueryKeys.delete, basePath, jwt],
    (params) => deleteApp(params.appId, basePath, jwt)
  );

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    deleteApp: (
      params: DeleteAppHookParams,
      options?: MutateOptions<Apps.RespChangeCount, Error, DeleteAppHookParams>
    ) => {
      return mutate(params, options);
    },
    deleteAppAsync: (
      params: DeleteAppHookParams,
      options?: MutateOptions<Apps.RespChangeCount, Error, DeleteAppHookParams>
    ) => mutateAsync(params, options),
  };
};

export default useDelete;
