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
const login = async (
  username: string,
  password: string,
  basePath: string
): Promise<UpstreamRespCreateToken> => {
  const promise = await fetch(`${basePath}/token`, {
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
  return promise.json();
};

export default login;
