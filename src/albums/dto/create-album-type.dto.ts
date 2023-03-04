import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
