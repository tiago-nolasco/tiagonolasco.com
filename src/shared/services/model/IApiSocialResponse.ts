import { IApiResponse } from "./IApiResponse";
import { ISocial } from "../../model/ISocial";

export interface IApiSocialResponse extends IApiResponse {
  data: ISocial[]
}

