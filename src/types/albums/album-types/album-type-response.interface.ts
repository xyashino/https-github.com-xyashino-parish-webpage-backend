import { AlbumType } from './album-type-entity.interface';

export interface AlbumTypeResponse {
  id: AlbumType['id'];
  name: AlbumType['name'];
  albums: AlbumType['albums'];
  order: AlbumType['order'];
}
