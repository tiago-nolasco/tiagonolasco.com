import { IKeyValue } from "./IKeyValue";
import { ISeo } from "../../services/api/model/ISeo";
import { ISocial } from "../../services/api/model/ISocial";

export interface IWebsiteStoreState {
  i18n?: IKeyValue;
  seo?: ISeo;
  social?: ISocial[];
}
