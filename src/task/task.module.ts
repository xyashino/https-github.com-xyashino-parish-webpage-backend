import { Module } from '@nestjs/common';
import { AnnouncementsModule } from '../announcements/announcements.module';
import { AnnouncementsService } from '../announcements/announcements.service';

@Module({
  imports: [AnnouncementsModule],
  providers: [AnnouncementsService],
})
export class TaskModule {}
