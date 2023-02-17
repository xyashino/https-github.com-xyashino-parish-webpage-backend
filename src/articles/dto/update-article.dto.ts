import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ArticleType } from '../../enums/article.enum';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  @IsOptional()
  @IsString()
  body?: string;
  @IsOptional()
  @IsNumber()
  @Min(-100)
  @Max(100)
  order?: number;

  @IsOptional()
  @IsBoolean()
  show?: boolean;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  title?: string;

  @IsOptional()
  @IsEnum(ArticleType)
  type?: ArticleType;
}
