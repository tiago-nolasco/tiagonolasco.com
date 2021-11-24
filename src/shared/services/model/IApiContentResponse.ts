import { IApiResponse } from "./IApiResponse";
import { IContent } from "../../model/IContent";

export interface IApiContentResponse extends IApiResponse {
  data: IContent
}

