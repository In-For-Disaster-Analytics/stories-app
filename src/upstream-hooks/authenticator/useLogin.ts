import { useMutation } from 'react-query';
import { login } from 'upstream-api/authenticator';
import QueryKeys from './queryKeys';
import { UpstreamRespCreateToken } from 'upstream-api/authenticator/login';
import useUpstreamConfig from 'upstream-hooks/context/useUpstreamConfig';

type LoginHookParams = {
  username: string;
  password: string;
};

const useLogin = () => {
  const { setAccessToken, basePath } = useUpstreamConfig();

  // On successful login, save the token to the TapisContext state
  const onSuccess = (response: UpstreamRespCreateToken) => {
    setAccessToken(response);
  };

  // The useMutation react-query hook is used to call operations that make server-side changes
  // (Other hooks would be used for data retrieval)
  //
  // In this case, loginHelper is called to perform the operation, with an onSuccess callback
  // passed as an option
  const { mutate, isLoading, isError, isSuccess, error } = useMutation<
    UpstreamRespCreateToken,
    Error,
    LoginHookParams
  >(
    [QueryKeys.login, basePath],
    ({ username, password }) => login(username, password, basePath),
    { onSuccess }
  );

  // Return hook object with loading states and login function
  return {
    isLoading,
    isError,
    isSuccess,
    error,
    login: (username: string, password: string) => {
      // Call mutate to trigger a single post-like API operation
      return mutate({ username, password });
    },
    logout: () => setAccessToken(null),
  };
};

export default useLogin;
