import { useEffect } from "react";
import { useMutation } from "react-query";
import { Systems } from "@tapis/tapis-typescript";
import { useTapisConfig } from "tapis-hooks";
import QueryKeys from "./queryKeys";
import create from "tapis-api/credentials/create";
import { ReqCreateCredential } from "./types";

const useCreate = () => {
  const { basePath, accessToken } = useTapisConfig();
  const jwt = accessToken?.access_token || "";

  const { mutate, isLoading, isError, isSuccess, data, error, reset } =
    useMutation<Systems.RespBasic, Error, ReqCreateCredential>(
      [QueryKeys, basePath, jwt],
      (request: ReqCreateCredential) =>
        create(
          request.username,
          request.systemId,
          request.request,
          basePath,
          jwt
        )
    );
  useEffect(() => reset(), [reset]);

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    data,
    error,
    reset,
    submit: (request: ReqCreateCredential) => {
      // Call mutate to trigger a single post-like API operation
      return mutate(request);
    },
  };
};

export default useCreate;
