import { IApiResponse } from "./IApiResponse";
import { IContentSkills } from "../../model/IContentSkills";

export interface IApiSkillsResponse extends IApiResponse {
  data: IContentSkills[];
}
