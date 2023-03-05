import { DayIntentionEntity } from '../day-intention-entity.interface';
import { CreateIntentionRequest } from '../../requests';

export interface CreateDayIntentionRequest {
  day: DayIntentionEntity['day'];
  dateOfDay?: DayIntentionEntity['dateOfDay'];
  intentions: CreateIntentionRequest[];
}
