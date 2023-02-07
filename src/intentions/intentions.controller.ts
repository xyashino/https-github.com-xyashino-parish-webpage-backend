import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IntentionsService } from './intentions.service';
import { CreateDayIntentionsDto } from './dto/create-day-intentions.dto';
import { UpdateDayIntentionsDto } from './dto/update-day-intentions.dto';
import { UpdateIntentionDto } from './dto/update-intention.dto';
import { AuthGuard } from '@nestjs/passport';
import { DayIntentionsResponse } from '../types/intentions/day-intentions-response.interface';

@Controller('intentions')
export class IntentionsController {
  @Inject(forwardRef(() => IntentionsService))
  public intentionsService: IntentionsService;

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createIntentionDto: CreateDayIntentionsDto,
  ): Promise<DayIntentionsResponse> {
    return this.intentionsService.create(createIntentionDto);
  }

  @Get()
  findAll(): Promise<DayIntentionsResponse[]> {
    return this.intentionsService.findAll();
  }
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DayIntentionsResponse> {
    return this.intentionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIntentionDto: UpdateDayIntentionsDto,
  ): Promise<DayIntentionsResponse> {
    return this.intentionsService.update(id, updateIntentionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.intentionsService.remove(id);
  }

  @Patch(':id/:childId')
  @UseGuards(AuthGuard('jwt'))
  updateChild(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('childId', ParseUUIDPipe) uuid: string,
    @Body() body: UpdateIntentionDto,
  ): Promise<DayIntentionsResponse> {
    return this.intentionsService.updateChild(id, uuid, body);
  }
}
