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

export class UpdateDayIntentionsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(Day)
  day: Day;

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  dateOfDay: Date;

  @IsOptional()
  @ArrayMinSize(0)
  @ValidateNested()
  @Type(() => CreateIntentionDto)
  intentions: CreateIntentionDto[];
}
