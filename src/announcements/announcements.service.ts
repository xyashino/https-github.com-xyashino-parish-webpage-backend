import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementsEntity } from './entities/announcements.entity';
import { AnnouncementItemEntity } from './entities/announcement-item.entity';
import { CreateAnnouncementItemDto } from './dto/create-announcement-item.dto';

@Injectable()
export class AnnouncementsService {
  async create({ announcements, title, subtitle }: CreateAnnouncementDto) {
    const newAnnouncement = new AnnouncementsEntity();
    newAnnouncement.title = title;
    newAnnouncement.subtitle = subtitle;
    await newAnnouncement.save();
    await this.createAnnouncements(announcements, newAnnouncement);
    return newAnnouncement;
  }
  async findMany() {
    return await AnnouncementsEntity.find({
      relations: {
        announcements: true,
      },
      order: {
        announcements: {
          order: 'asc',
        },
      },
    });
  }

  async findOne(id: string) {
    const announcementEntity = await AnnouncementsEntity.findOne({
      relations: {
        announcements: true,
      },
      order: {
        announcements: {
          order: 'asc',
        },
      },
      where: {
        id,
      },
    });

    if (!announcementEntity) throw new NotFoundException();

    return announcementEntity;
  }

  async update(
    id: string,
    { announcements, title, subtitle }: UpdateAnnouncementDto,
  ) {
    const announcementEntity = await AnnouncementsEntity.findOne({
      where: { id },
      relations: { announcements: true },
    });
    if (!announcementEntity) throw new NotFoundException();
    announcementEntity.title = title ?? announcementEntity.title;
    announcementEntity.subtitle = subtitle ?? announcementEntity.subtitle;
    await announcementEntity.save();

    if (announcementEntity.announcements.length !== 0) {
      for await (const announcement of announcementEntity.announcements) {
        await announcement.remove();
      }
    }
    if (announcements) {
      await this.createAnnouncements(announcements, announcementEntity);
    }
    return this.findOne(announcementEntity.id);
  }

  remove(id: string) {
    AnnouncementsEntity.findOneBy({ id });
  }

  private async createAnnouncements(
    announcements: CreateAnnouncementItemDto[],
    announcementEntity: AnnouncementsEntity,
  ) {
    for await (const { order, body } of announcements) {
      const newChild = new AnnouncementItemEntity();
      newChild.body = body;
      newChild.order = order;
      newChild.announcement = announcementEntity;
      await newChild.save();
    }
  }
}
