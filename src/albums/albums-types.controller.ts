import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Body,
  Patch,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { AlbumsTypesService } from './albums-types.service';
import { UpdateAlbumTypeDto } from './dto/update-album-type.dto';
import { CreateAlbumTypeDto } from './dto/create-album-type.dto';
import { AlbumTypeResponse } from '../types';

@Controller('albums/types')
export class AlbumsTypesController {
  @Inject(forwardRef(() => AlbumsTypesService))
  private readonly albumsTypeService: AlbumsTypesService;
  @Get()
  getAll(): Promise<AlbumTypeResponse[]> {
    return this.albumsTypeService.findAll();
  }

  @Post()
  createType(@Body() body: CreateAlbumTypeDto): Promise<AlbumTypeResponse> {
    return this.albumsTypeService.create(body);
  }
  @Get(':id')
  getOne(
    @Param('id', ParseUUIDPipe) typeId: string,
  ): Promise<AlbumTypeResponse> {
    return this.albumsTypeService.findOne(typeId);
  }
  @Delete(':id')
  removeType(@Param('id', ParseUUIDPipe) typeId: string) {
    return this.albumsTypeService.remove(typeId);
  }

  @Patch(':id')
  updateType(
    @Param('id', ParseUUIDPipe) typeId: string,
    @Body() body: UpdateAlbumTypeDto,
  ): Promise<AlbumTypeResponse> {
    return this.albumsTypeService.update(typeId, body);
  }
}
