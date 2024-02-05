import { Systems } from "@tapis/tapis-typescript";
import { apiGenerator, errorDecoder } from "tapis-api/utils";

const create = (
  username: string,
  systemId: string,
  request: Systems.ReqUpdateCredential,
  basePath: string,
  jwt: string
) => {
  console.log(username);
  const api: Systems.CredentialsApi = apiGenerator<Systems.CredentialsApi>(
    Systems,
    Systems.CredentialsApi,
    basePath,
    jwt
  );
  return errorDecoder<Systems.RespResourceUrl>(() =>
    api.createUserCredential({
      systemId: systemId,
      userName: username,
      reqUpdateCredential: request,
    })
  );
};

export default create;
