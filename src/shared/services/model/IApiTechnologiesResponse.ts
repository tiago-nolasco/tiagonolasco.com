import { IApiResponse } from "./IApiResponse";
import { IContentTechnologies } from "../../model/IContentTechnologies";

export interface IApiTechnologiesResponse extends IApiResponse {
  data: IContentTechnologies[];
}
