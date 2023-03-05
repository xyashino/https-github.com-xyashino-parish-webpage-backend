import { Intention } from './intention-entity.interface';

export interface IntentionResponse {
  id: Intention['id'];
  hour: Intention['hour'];
  value: Intention['value'];
}
