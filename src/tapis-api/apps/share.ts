import { Apps } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const shareApp = (
  request: Apps.ShareAppRequest,
  basePath: string,
  jwt: string
) => {
  const api: Apps.SharingApi = apiGenerator<Apps.SharingApi>(
    Apps,
    Apps.SharingApi,
    basePath,
    jwt
  );
  return errorDecoder<Apps.RespBasic>(() => api.shareApp(request));
};

export default shareApp;
