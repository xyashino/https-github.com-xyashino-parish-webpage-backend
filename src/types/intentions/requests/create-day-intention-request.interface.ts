import { Day } from 'src/enums/day.enum';
import { CreateIntentionRequest } from './create-intention-request.interface';

export interface CreateDayIntentionRequest {
  day: Day;
  dateOfDay?: Date;
  intentions: CreateIntentionRequest[];
}
