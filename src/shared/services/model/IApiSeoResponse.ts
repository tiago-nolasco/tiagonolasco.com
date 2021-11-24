import { IApiResponse } from "./IApiResponse";
import { ISeo } from "../../model/ISeo";

export interface IApiSeoResponse extends IApiResponse {
  data: ISeo
}

