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
import { CreateAnnouncementItemDto } from './create-announcement-item.dto';
import { AnnouncementStatus } from '../../enums/announcement-status.enum';
import { CreateAnnouncementRequest } from '../../types';

export class CreateAnnouncementDto implements CreateAnnouncementRequest {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @IsOptional()
  @ValidateIf((object, value) => value !== null)
  @IsEnum(AnnouncementStatus)
  status?: AnnouncementStatus;

  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateAnnouncementItemDto)
  announcements: CreateAnnouncementItemDto[];
}
