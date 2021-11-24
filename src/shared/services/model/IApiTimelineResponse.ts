import { IApiResponse } from "./IApiResponse";
import { IContentTimeline } from "../../model/IContentTimeline";

export interface IApiTimelineResponse extends IApiResponse {
  data: IContentTimeline[];
}
