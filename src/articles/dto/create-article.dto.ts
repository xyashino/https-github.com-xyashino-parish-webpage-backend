import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

import { Article } from '../../types/article/article-entity.interface';
import { ArticleType } from '../../enums/article.enum';

export class CreateArticleDto implements Partial<Article> {
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsOptional()
  @IsNumber()
  @Min(-100)
  @Max(100)
  order?: number;

  @IsOptional()
  @IsBoolean()
  show?: boolean;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  title: string;

  @IsOptional()
  @IsEnum(ArticleType)
  type?: ArticleType;
}
