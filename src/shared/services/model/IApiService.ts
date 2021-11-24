import { ISeo } from "../../model/ISeo";

export interface IApiService {
  getSeo(): Promise<ISeo>;
}
