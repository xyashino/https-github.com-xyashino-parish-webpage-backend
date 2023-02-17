import { Article } from '../../types/article/article-entity.interface';
import { Expose } from 'class-transformer';
import { ArticleType } from '../../enums/article.enum';

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
