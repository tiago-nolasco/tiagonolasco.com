import { ImageAlignEnum } from './ImageAlignEnum';

export interface IContentMedia {
  title: string;
  file: string;
  showFullImage?: boolean;
  align?: ImageAlignEnum;
  main?: boolean;
}
