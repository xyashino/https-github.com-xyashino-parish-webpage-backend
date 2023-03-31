import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementItemDto } from './create-announcement-item.dto';
import {
  ArrayMinSize,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AnnouncementStatus } from '../../enums/announcement-status.enum';

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

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsEnum(AnnouncementStatus)
  status?: AnnouncementStatus;

  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => CreateAnnouncementItemDto)
  announcements: CreateAnnouncementItemDto[];
}
