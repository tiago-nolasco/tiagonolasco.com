import { ISeo } from "./ISeo";

export interface IApiService {
  getSeo(): Promise<ISeo>;
}
