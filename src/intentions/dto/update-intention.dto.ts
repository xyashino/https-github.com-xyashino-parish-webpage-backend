import { PartialType } from '@nestjs/mapped-types';
import { CreateIntentionDto } from './create-intention.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UpdateIntentionRequest } from '../../types/intentions/requests/update-intention-request.interface';

export class UpdateIntentionDto
  extends PartialType(CreateIntentionDto)
  implements UpdateIntentionRequest
{
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  hour: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  value: string;
}
