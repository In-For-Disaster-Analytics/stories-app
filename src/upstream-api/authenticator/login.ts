import { Authenticator } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

export interface UpstreamRespCreateToken {
  access_token: string;
  token_type: string;
}

export interface UpstreamNewAccessTokenResponse {
  access_token: string;
  token_type: string;
}
// This helper takes the username and password and assembles an API call
const login = (
  username: string,
  password: string,
  basePath: string
): Promise<UpstreamRespCreateToken> => {
  const promise: Promise<UpstreamRespCreateToken> = fetch(`${basePath}/token`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: username,
      password: password,
    }),
  });
  return promise;
};

export default login;
