import { IApiResponse } from "./IApiResponse";
import { II18n } from "../../model/II18n";

export interface IApiI18nResponse extends IApiResponse {
  data: II18n[]
}

