import { Album } from '../album-entity.interface';

export interface AlbumType {
  id: string;
  name: string;
  albums: Album[];
}
