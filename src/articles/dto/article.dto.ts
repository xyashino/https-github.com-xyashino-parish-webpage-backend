import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
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
import { ArticleType } from '../../types/enums/article.enum';
import { Article } from '../../types/article/article-entity.interface';
import { Expose } from 'class-transformer';

export class ArticleDto implements Partial<Article> {
  @Expose()
  id: string;
  @Expose()
  body: string;
  @Expose()
  order: number;
  @Expose()
  show: boolean;
  @Expose()
  title: string;
  @Expose()
  type: ArticleType;
}
