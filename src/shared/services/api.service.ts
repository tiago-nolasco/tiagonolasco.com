import axios, {AxiosResponse} from 'axios';

import { IApiService } from "./model/IApiService";
import { ContentTagEnum } from "../model/ContentTagEnum";
import { IApiSeoResponse } from "./model/IApiSeoResponse";
import { IApiI18nResponse } from "./model/IApiI18nResponse";
import { IApiContentResponse } from "./model/IApiContentResponse";
import { IApiSocialResponse } from "./model/IApiSocialResponse";
import { ISeo } from '../model/ISeo';
import { IContent } from '../model/IContent';
import { IContentSkills } from "../model/IContentSkills";
import { IContentTimeline } from "../model/IContentTimeline";
import { IContentProjects } from "../model/IContentProjects";
import { II18n } from '../model/II18n';
import { ISocial } from '../model/ISocial';
import { IApiSkillsResponse } from './model/IApiSkillsResponse';
import { IApiTimelineResponse } from './model/IApiTimelineResponse';
import { IApiProjectsResponse } from './model/IApiProjectsResponse';
import { IApiContentGroupResponse } from './model/IApiContentGroupResponse';

export class ApiService implements IApiService {

  private static instance: ApiService;

  public static getInstance(): ApiService {
    if (!this.instance) {
      this.instance = new ApiService();
    }
    return this.instance;
  }

  public async getSocial(): Promise<ISocial[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/social?sort=order&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiSocialResponse) => res.data);
  }

  public async getI18n(): Promise<II18n[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/i18n`)
      .then(this.navigateAxios)
      .then((res: IApiI18nResponse) => res.data);
  }

  public async getSeo(): Promise<ISeo> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/seo`)
      .then(this.navigateAxios)
      .then((res: IApiSeoResponse) => res.data);
  }

  public async getContent(tag: ContentTagEnum): Promise<IContent> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content/${tag}`)
      .then(this.navigateAxios)
      .then((res: IApiContentResponse) => res.data);
  }

  public async getSkills(): Promise<IContentSkills[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_skills?fields=score&sort=order&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiSkillsResponse) => res.data);
  }

  public async getFoundations(): Promise<IContent[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_foundations?sort=order&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiContentGroupResponse) => res.data);
  }
  
  public async getPersonal(): Promise<IContentTimeline[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_personal?fields=initDate,isSideNote&sort=initdate&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiTimelineResponse) => res.data);
  }

  public async getProfessional(): Promise<IContentTimeline[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_professional?fields=initDate,isSideNote&sort=initdate&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiTimelineResponse) => res.data);
  }

  public async getAcademy(): Promise<IContentTimeline[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_academy?fields=initDate,endDate,isSideNote&sort=initdate&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiTimelineResponse) => res.data);
  }

  public async getProjects(): Promise<IContentProjects[]> {
    return axios.get(`https://www.api.tncreate.pt/v1.0/pt/tiagonolasco/content_projects?fields=url&sort=title&direction=ASC`)
      .then(this.navigateAxios)
      .then((res: IApiProjectsResponse) => res.data);
  }

  private navigateAxios(res: AxiosResponse): unknown {
    return res.data;
  }

}
