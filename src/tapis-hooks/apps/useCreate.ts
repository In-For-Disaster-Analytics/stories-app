import { useEffect } from "react";
import { useMutation } from "react-query";
import { Apps, Jobs } from "@tapis/tapis-typescript";
import { submit } from "tapis-api/jobs";
import { useTapisConfig } from "tapis-hooks";
import QueryKeys from "./queryKeys";
import create from "tapis-api/apps/create";

const useCreate = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || "";

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, submit helper is called to perform the operation
  const { mutate, isLoading, isError, isSuccess, data, error, reset } =
    useMutation<Apps.RespResourceUrl, Error, Apps.ReqPostApp>(
      [QueryKeys, basePath, jwt],
      (request: Apps.ReqPostApp) => create(request, basePath, jwt)
    );
  //   useMutation<Jobs.RespSubmitJob, Error, Jobs.ReqSubmitJob>(
  //   [QueryKeys.submit, appId, appVersion, basePath, jwt],
  //   (request: Jobs.ReqSubmitJob) => submit(request, basePath, jwt)
  // );

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
    submit: (request: Apps.ReqPostApp) => {
      // Call mutate to trigger a single post-like API operation
      return mutate(request);
    },
  };
};

export default useCreate;
