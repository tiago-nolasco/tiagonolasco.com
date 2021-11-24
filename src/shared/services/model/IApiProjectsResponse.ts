import { IApiResponse } from "./IApiResponse";
import { IContentProjects } from "../../model/IContentProjects";

export interface IApiProjectsResponse extends IApiResponse {
  data: IContentProjects[];
}
