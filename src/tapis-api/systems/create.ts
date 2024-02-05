import { Systems } from "@tapis/tapis-typescript";
import { apiGenerator, errorDecoder } from "tapis-api/utils";

const create = (
  request: Systems.ReqPostSystem,
  basePath: string,
  jwt: string
) => {
  const api: Systems.SystemsApi = apiGenerator<Systems.SystemsApi>(
    Systems,
    Systems.SystemsApi,
    basePath,
    jwt
  );
  return errorDecoder<Systems.RespResourceUrl>(() =>
    api.createSystem({ reqPostSystem: request })
  );
};

export default create;
