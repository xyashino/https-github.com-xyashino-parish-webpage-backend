import { IsEnum, IsOptional } from 'class-validator';
import { AnnouncementStatus } from '../../enums/announcement-status.enum';

export class IsEnumStatus {
  @IsOptional()
  @IsEnum(AnnouncementStatus)
  status: AnnouncementStatus;
}
