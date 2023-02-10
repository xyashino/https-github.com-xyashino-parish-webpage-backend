import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Body,
  Patch,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Post()
  create(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body);
  }
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get('types')
  getTypes() {
    return this.albumsService.getTypes();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.remove(id);
  }

  @Delete('/image/:imageId')
  removeImage(@Param('imageId', ParseUUIDPipe) id: string) {
    return this.albumsService.removeImage(id);
  }
}
