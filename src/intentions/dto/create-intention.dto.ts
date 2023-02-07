import { IsNotEmpty, IsString } from 'class-validator';
import { CreateIntentionRequest } from '../../types/intentions/requests/create-intention-request.interface';

export class CreateIntentionDto implements CreateIntentionRequest {
  @IsNotEmpty()
  @IsString()
  hour: string;
  @IsNotEmpty()
  @IsString()
  value: string;
}
