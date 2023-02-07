import {
  ArrayMinSize,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateIntentionDto } from './create-intention.dto';
import { Day } from '../../types/enums/day.enum';
import { CreateDayIntentionRequest } from '../../types/intentions/requests/create-day-intention-request.interface';

export class CreateDayIntentionsDto implements CreateDayIntentionRequest {
  @IsNotEmpty()
  @IsEnum(Day)
  day: Day;

  @IsOptional()
  @IsDate()
  dateOfDay: Date;

  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => CreateIntentionDto)
  intentions: CreateIntentionDto[];
}
