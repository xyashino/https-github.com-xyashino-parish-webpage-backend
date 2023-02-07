import {
  ArrayMinSize,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAnnouncementItemDto } from './create-announcement-item.dto';
import { CreateAnnouncementRequest } from '../../types/announcement/request/create-announcement-request.interface';

export class CreateAnnouncementDto implements CreateAnnouncementRequest {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  subtitle: string;

  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateAnnouncementItemDto)
  announcements: CreateAnnouncementItemDto[];
}
