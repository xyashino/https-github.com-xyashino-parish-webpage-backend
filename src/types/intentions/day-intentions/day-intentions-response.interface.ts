import { DayIntentionEntity } from './day-intention-entity.interface';
export interface DayIntentionsResponse {
  id: DayIntentionEntity['id'];
  day: DayIntentionEntity['day'];
  dateOfDay: DayIntentionEntity['dateOfDay'];
  intentions: DayIntentionEntity['intentions'];
}
