import { IContent } from "./IContent";

export interface IContentTimeline extends IContent {
  initDate: string;
  endDate?: string;
  isSideNote: string;
}
