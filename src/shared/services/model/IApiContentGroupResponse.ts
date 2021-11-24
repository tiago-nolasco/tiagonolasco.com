import { IApiResponse } from "./IApiResponse";
import { IContent } from "../../model/IContent";

export interface IApiContentGroupResponse extends IApiResponse {
  data: IContent[];
}
