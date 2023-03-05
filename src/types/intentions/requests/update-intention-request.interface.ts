import { Intention } from '../intention-entity.interface';

export interface UpdateIntentionRequest {
  hour?: Intention['hour'];
  value?: Intention['value'];
}
