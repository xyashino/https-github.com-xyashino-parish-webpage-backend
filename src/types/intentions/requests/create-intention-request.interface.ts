import { Intention } from '../intention-entity.interface';

export interface CreateIntentionRequest {
  hour: Intention['hour'];
  value: Intention['value'];
}
