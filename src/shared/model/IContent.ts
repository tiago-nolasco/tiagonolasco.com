import { IContentMedia } from './IContentMedia';

export interface IContent {
  code: string,
  title: string,
  summary: string,
  description: string,
  images: IContentMedia[],
  documents: IContentMedia[]
}
