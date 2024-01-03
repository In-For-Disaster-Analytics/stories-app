import { Apps } from "@tapis/tapis-typescript";
import { apiGenerator, errorDecoder } from "tapis-api/utils";

const create = (request: Apps.ReqPostApp, basePath: string, jwt: string) => {
  const api: Apps.ApplicationsApi = apiGenerator<Apps.ApplicationsApi>(
    Apps,
    Apps.ApplicationsApi,
    basePath,
    jwt
  );
  return errorDecoder<Apps.RespResourceUrl>(() =>
    api.createAppVersion({ reqPostApp: request })
  );
};

export default create;
