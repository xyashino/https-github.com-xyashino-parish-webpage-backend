import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { ArticleDto } from './dto/article.dto';
import { ArticleType } from '../enums/article.enum';

@Serialize(ArticleDto)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAllByType(
    @Query('type') type: ArticleType,
    @Query('headers') headers: true,
  ) {
    if (type || headers) {
      return this.articlesService.findAllByQuery(type, headers);
    }
    return this.articlesService.findAll();
  }

  @Get('/types')
  getArticlesTypes() {
    return Object.entries(ArticleType);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.articlesService.remove(id);
  }
}
