import { Day } from 'src/enums/day.enum';
import { IntentionResponse } from '../intention-response.interface';
export interface DayIntentionEntity {
  id: string;
  day: Day;
  dateOfDay: Date | null;
  intentions: IntentionResponse[];
}
