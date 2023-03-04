import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  findAll() {
    return this.albumsService.findAll();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateAlbumDto) {
    return this.albumsService.create(body);
  }
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.remove(id);
  }

  @Delete('/image/:imageId')
  @UseGuards(AuthGuard('jwt'))
  removeImage(@Param('imageId', ParseUUIDPipe) id: string) {
    return this.albumsService.removeImage(id);
  }
}
