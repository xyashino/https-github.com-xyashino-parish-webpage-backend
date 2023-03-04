import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAlbumTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
