import { IContent } from "./IContent";

export interface IContentSkills extends IContent {
  score: number;
  idSubCat: string;
  subCatName: string;
}
