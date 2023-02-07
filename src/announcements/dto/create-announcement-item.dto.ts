import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAnnouncementItemDto {
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsNumber()
  @IsNotEmpty()
  order: number;
}
