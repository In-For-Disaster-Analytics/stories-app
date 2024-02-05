import { Systems } from "@tapis/tapis-typescript";

export interface ReqCreateCredential {
  username: string;
  systemId: string;
  request: Systems.ReqUpdateCredential;
}
