import { IKeyValue } from "./IKeyValue";
import { ISeo } from "../../model/ISeo";
import { ISocial } from "../../model/ISocial";

export interface IWebsiteStoreState {
  i18n?: IKeyValue;
  seo?: ISeo;
  social?: ISocial[];
}
