import { IWebsiteStoreState } from "./model/IWebsiteStoreState";
import { IKeyValue } from "./model/IKeyValue";

import { II18n } from '../model/II18n';
import { ISeo } from "../model/ISeo";
import { ISocial } from "../model/ISocial";

class WebsiteStore {

  private state: IWebsiteStoreState = {};

  constructor (initialState: IWebsiteStoreState) {
    this.state = initialState;
  }

  set i18n (state: II18n[]) {
    this.state.i18n = state.reduce((acc: IKeyValue, obj: II18n) => {
      acc[obj.tag] = obj.description;
      return acc;
    }, {});
  }

  set seo(seo: ISeo) {
    this.state.seo = seo;
  }

  set social(social: ISocial[]) {
    this.state.social = social;
  }

  get seo(): ISeo {
    return this.state.seo;
  }

  get social(): ISocial[] {
    return this.state.social;
  }

  getLabel(tag: string): string {
    return this.state.i18n && this.state.i18n[tag] || tag;
  }

}

const websiteStore = new WebsiteStore({});
export default websiteStore;
