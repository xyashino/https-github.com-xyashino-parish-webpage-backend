import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateAlbumTypeDto {
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(-100)
  @Max(100)
  order?: number;
}
