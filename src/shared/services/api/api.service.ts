import axios, {AxiosInstance, AxiosResponse} from 'axios';

import { ContentTagEnum } from "./model/ContentTagEnum";
import { IApiService } from "./model/IApiService";
import { IApiResponse } from './model/IApiResponse';
import { IContent } from './model/IContent';
import { IContentSkills } from "./model/IContentSkills";
import { IContentTimeline } from "./model/IContentTimeline";
import { IContentProjects } from "./model/IContentProjects";
import { ISeo } from './model/ISeo';
import { II18n } from './model/II18n';
import { ISocial } from './model/ISocial';

enum SortDirectionEnum {
  ASC = "ASC",
  DESC = "DESC",
  RAND = "RAND"
}

interface IHttpGetParams {
  fields?: string[];
  sort?: string;
  limit?: number;
  direction?: SortDirectionEnum;
}

class ApiService implements IApiService {

  private lang = "pt";
  private website = "tiagonolasco";
  private http: AxiosInstance = axios.create({
    baseURL: "https://www.api.tncreate.pt/v1.0"
  });

  public getSocial(): Promise<ISocial[]> {
    return this.httpGet("social", {
      sort: "order",
      direction: SortDirectionEnum.ASC
    });
  }

  public getI18n(): Promise<II18n[]> {
    return this.httpGet("i18n");
  }

  public getSeo(): Promise<ISeo> {
    return this.httpGet("seo");
  }

  public getQuotes(): Promise<IContent[]> {
    return this.httpGet("content_quotes", {
      limit: 2,
      direction: SortDirectionEnum.RAND
    });
  }

  public getContent(tag: ContentTagEnum): Promise<IContent> {
    return this.httpGet(`content/${tag}`);
  }

  public getSkills(): Promise<IContentSkills[]> {
    return this.httpGet("content_skills", {
      fields: ["score", "idsubcat"],
      sort: "order",
      direction: SortDirectionEnum.ASC
    });
  }

  public getFoundations(): Promise<IContent[]> {
    return this.httpGet("content_foundations", {
      sort: "order",
      direction: SortDirectionEnum.ASC
    });
  }
  
  public getPersonal(): Promise<IContentTimeline[]> {
    return this.httpGet("content_personal", {
      fields: ["initDate", "isSideNote"],
      sort: "initdate",
      direction: SortDirectionEnum.ASC
    });
  }

  public getProfessional(): Promise<IContentTimeline[]> {
    return this.httpGet("content_professional", {
      fields: ["initDate", "isSideNote"],
      sort: "initdate",
      direction: SortDirectionEnum.ASC
    });
  }

  public getAcademy(): Promise<IContentTimeline[]> {
    return this.httpGet("content_academy", {
      fields: ["initDate", "isSideNote"],
      sort: "initdate",
      direction: SortDirectionEnum.ASC
    });
  }

  public getProjects(): Promise<IContentProjects[]> {
    return this.httpGet("content_projects", {
      fields: ["url"],
      sort: "title",
      direction: SortDirectionEnum.ASC
    });
  }

  private async httpGet<T>(endpoint: string, params?: IHttpGetParams): Promise<T> {
    return await this.http.get(`${this.lang}/${this.website}/${endpoint+this.getQueryString(params)}`)
      .then((res: AxiosResponse) => res.data)
      .then((res: IApiResponse) => res.data) as T;
  }

  private getQueryString(params: IHttpGetParams): string {

    const keys: string[] = params && Object.keys(params) || [];
    if (keys.length === 0) return "";

    const queryString: string[] = keys.reduce((acc: string[], key: string) => {
      const param: number | string | string[] = params[key];
      const value: string = param.constructor === Array ? param.join() : param.toString();

      acc.push(`${key}=${value}`);

      return acc;
    }, []);

    return `?${queryString.join("&")}`;
  }

}

const apiService = new ApiService();
export default apiService;
