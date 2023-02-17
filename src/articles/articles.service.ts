import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';
import { ArticleType } from '../enums/article.enum';

@Injectable()
export class ArticlesService {
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = await ArticleEntity.create({ ...createArticleDto });
    return newArticle.save();
  }

  findAll() {
    return ArticleEntity.find({
      order: {
        order: 'DESC',
        createdAt: 'DESC',
      },
    });
  }
  findAllByQuery(type?: ArticleType) {
    return ArticleEntity.findBy({ type });
  }

  async findOne(id: string) {
    const article = await ArticleEntity.findOneBy({ id });
    if (!article) throw new NotFoundException();
    return article;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);

    for (const [key, value] of Object.entries(updateArticleDto)) {
      article[key] = value;
    }
    return article.save();
  }

  async remove(id: string) {
    const article = await ArticleEntity.findOneBy({ id });
    await article.remove();
  }
}
