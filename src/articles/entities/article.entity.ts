import {
  BaseEntity,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Article } from '../../types/article/article-entity.interface';
import { ArticleType } from '../../types/enums/article.enum';

@Entity()
export class ArticleEntity extends BaseEntity implements Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ArticleType,
    default: ArticleType.News,
  })
  type: ArticleType;

  @Column()
  title: string;

  @Column('text')
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  order: number;
  @Column({
    type: 'boolean',
    default: true,
  })
  show: boolean;
  @BeforeUpdate()
  updateColumn() {
    this.updatedAt = new Date();
  }
}
