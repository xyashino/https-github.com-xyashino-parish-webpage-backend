import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementItemDto } from './create-announcement-item.dto';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAnnouncementDto extends PartialType(
  CreateAnnouncementItemDto,
) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => CreateAnnouncementItemDto)
  announcements: CreateAnnouncementItemDto[];
}
