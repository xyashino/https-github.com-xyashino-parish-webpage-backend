import { Image } from './image-entity.interface';
import { AlbumType } from './album-types';

export interface Album {
  id: string;
  title: string;
  subtitle?: string;
  backgroundImage?: Image['url'];
  type?: AlbumType;
  images: Image[];
}
