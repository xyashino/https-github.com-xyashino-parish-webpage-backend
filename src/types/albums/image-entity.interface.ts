import { Album } from './album-entity.interface';

export interface Image {
  id: string;
  oldName: string;
  extname: string;
  url: string;
  images: Album;
}
