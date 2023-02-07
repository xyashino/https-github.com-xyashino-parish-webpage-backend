import {
  ConflictException,
  ImATeapotException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDayIntentionsDto } from './dto/create-day-intentions.dto';
import { IntentionsDayEntity } from './entities/intentions-day.entity';
import { IntentionEntity } from './entities/intention.entity';
import { UpdateDayIntentionsDto } from './dto/update-day-intentions.dto';
import { CreateIntentionDto } from './dto/create-intention.dto';
import { UpdateIntentionDto } from './dto/update-intention.dto';

@Injectable()
export class IntentionsService {
  async create({ day, intentions, dateOfDay }: CreateDayIntentionsDto) {
    const existUniqueValue = await IntentionsDayEntity.findOneBy({ day });
    if (existUniqueValue) throw new ConflictException(`${day} exist`);

    const dayIntentions = new IntentionsDayEntity();
    dayIntentions.day = day;
    dayIntentions.dateOfDay = dateOfDay;
    const dayEntity = await dayIntentions.save();
    await this.createChildIntentions(dayEntity, intentions);
    return dayEntity;
  }

  async findAll() {
    return await IntentionsDayEntity.find({
      relations: {
        intentions: true,
      },
      order: {
        order: 'ASC',
      },
    });
  }
  async findOne(id: string) {
    const entity = await IntentionsDayEntity.findOne({
      where: { id },
      relations: {
        intentions: true,
      },
    });
    if (!entity) throw new NotFoundException();
    return entity;
  }

  async update(
    id: string,
    { intentions, day, dateOfDay }: UpdateDayIntentionsDto,
  ) {
    const entity = await IntentionsDayEntity.findOne({
      where: { id },
      relations: { intentions: true },
    });
    if (!entity) throw new NotFoundException();
    entity.day = day ?? entity.day;
    entity.dateOfDay = dateOfDay ?? entity.dateOfDay;

    await entity.save();

    if (entity.intentions.length !== 0) {
      for await (const oneIntention of entity.intentions) {
        await oneIntention.remove();
      }
    }

    if (intentions.length !== 0) {
      await this.createChildIntentions(entity, intentions);
    }

    return entity;
  }

  async remove(id: string) {
    const intention = await IntentionsDayEntity.findOneBy({ id });
    await intention.remove();
  }

  async updateChild(
    id: string,
    uuid: string,
    { hour, value }: UpdateIntentionDto,
  ) {
    if (!hour && !value) throw new ImATeapotException();

    const intention = await IntentionEntity.findOneBy({ id: uuid });
    if (!intention) throw new NotFoundException('Intention not found');
    intention.value = value ?? intention.value;
    intention.hour = hour ?? intention.value;
    await intention.save();

    return IntentionsDayEntity.findOne({
      where: {
        id,
      },
      relations: {
        intentions: true,
      },
    });
  }

  private async createChildIntentions(
    dayEntity: IntentionsDayEntity,
    intentions: CreateIntentionDto[],
  ) {
    for await (const { hour, value } of intentions) {
      const newIntention = new IntentionEntity();
      newIntention.day = dayEntity;
      newIntention.hour = hour;
      newIntention.value = value;
      await newIntention.save();
    }
  }
}
