import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { AnnouncementsEntity } from './entities/announcements.entity';
import { AnnouncementItemEntity } from './entities/announcement-item.entity';
import { CreateAnnouncementItemDto } from './dto/create-announcement-item.dto';
import { AnnouncementStatus } from '../enums/announcement-status.enum';
import { clearEntities } from '../utils/clearEntities';
import { applyDataToEntity } from '../utils/applyDataToEntity';

@Injectable()
export class AnnouncementsService {
  async create({ announcements, status, ...rest }: CreateAnnouncementDto) {
    const newAnnouncement = new AnnouncementsEntity();
    await this.checkAndApplyStatus(status, newAnnouncement);
    applyDataToEntity(newAnnouncement, rest);
    await newAnnouncement.save();
    await this.createAnnouncements(announcements, newAnnouncement);
    return newAnnouncement;
  }
  async findMany(status: AnnouncementStatus | undefined) {
    return await AnnouncementsEntity.find({
      ...(status
        ? {
            where: { status },
            order: {
              announcements: {
                order: 'asc',
              },
            },
            relations: {
              announcements: true,
            },
          }
        : {}),
    });
  }

  async findOne(id: string) {
    const announcementEntity = await AnnouncementsEntity.findOne({
      where: {
        id,
      },
      relations: {
        announcements: true,
      },
      order: {
        announcements: {
          order: 'asc',
        },
      },
    });
    if (!announcementEntity) throw new NotFoundException();
    return announcementEntity;
  }

  async update(
    id: string,
    { announcements, status, ...rest }: UpdateAnnouncementDto,
  ) {
    const announcementEntity = await this.findOne(id);
    await this.checkAndApplyStatus(status, announcementEntity);
    applyDataToEntity(announcementEntity, rest);
    await announcementEntity.save();
    if (announcementEntity.announcements.length !== 0)
      await clearEntities(announcementEntity.announcements);
    if (announcements)
      await this.createAnnouncements(announcements, announcementEntity);
    return this.findOne(announcementEntity.id);
  }

  async remove(id: string) {
    const foundItem = await this.findOne(id);
    await clearEntities(foundItem.announcements);
    return foundItem.remove();
  }
  private async createAnnouncements(
    announcements: CreateAnnouncementItemDto[],
    announcementEntity: AnnouncementsEntity,
  ) {
    for await (const data of announcements) {
      const newChild = new AnnouncementItemEntity();
      applyDataToEntity(newChild, data);
      newChild.announcement = announcementEntity;
      await newChild.save();
    }
  }

  async clearStatus(status: AnnouncementStatus) {
    const foundItem = await AnnouncementsEntity.findOneBy({ status });
    if (!foundItem) return true;
    foundItem.status = null;
    return await foundItem.save();
  }

  private async checkAndApplyStatus(
    status: AnnouncementStatus | undefined,
    entity: AnnouncementsEntity,
  ) {
    if (status) {
      await this.clearStatus(status);
      entity.status = status;
    }
  }
}
