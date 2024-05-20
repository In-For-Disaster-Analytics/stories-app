import { Apps } from '@tapis/tapis-typescript';
import { apiGenerator, errorDecoder } from 'tapis-api/utils';

const patch = (
  request: Apps.PatchAppRequest,
  basePath: string,
  jwt: string
) => {
  const api: Apps.ApplicationsApi = apiGenerator<Apps.ApplicationsApi>(
    Apps,
    Apps.ApplicationsApi,
    basePath,
    jwt
  );
  return errorDecoder<Apps.RespResourceUrl>(() => {
    return api.patchApp(request);
  });
};

export default patch;
