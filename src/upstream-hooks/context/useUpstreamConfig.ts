import { useContext } from 'react';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import UpstreamContext from './UpstreamContext';
import { UpstreamNewAccessTokenResponse } from 'upstream-api/authenticator/login';

const useUpstreamConfig = () => {
  const { basePath } = useContext(UpstreamContext);

  const getAccessToken = (): UpstreamNewAccessTokenResponse | undefined => {
    const cookie = Cookies.get('upstream-token');
    if (!!cookie) return JSON.parse(cookie);
    return undefined;
  };

  const { data, refetch } = useQuery<
    UpstreamNewAccessTokenResponse | undefined
  >('upstream-token', getAccessToken, {
    initialData: () => getAccessToken(),
  });

  const setAccessToken = async (
    resp: UpstreamNewAccessTokenResponse | null | undefined
  ): Promise<void> => {
    if (!resp) {
      Cookies.remove('upstream-token');
      await refetch();
      return;
    }
    const expires = new Date(0);
    Cookies.set('upstream-token', JSON.stringify(resp));
    await refetch();
  };

  const claims: { [key: string]: any } = data?.access_token
    ? jwt_decode(data?.access_token)
    : {};

  return {
    basePath,
    accessToken: data,
    setAccessToken,
    claims,
  };
};

export default useUpstreamConfig;
