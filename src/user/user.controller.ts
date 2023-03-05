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
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { UsersResponse } from '../types';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@Serialize(UserDto)
export class UserController {
  @Inject(forwardRef(() => UserService))
  private userService: UserService;

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(): Promise<UsersResponse[]> {
    return this.userService.findAll();
  }
  @Post('register')
  register(@Body() body: RegisterUserDto): Promise<UsersResponse> {
    return this.userService.register(body);
  }

  @Get('current')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@UserObj() user: UserEntity): UsersResponse {
    return this.userService.getCurrentUser(user);
  }
  @Patch('current')
  @UseGuards(AuthGuard('jwt'))
  async updateCurrentUser(
    @UserObj() user: UserEntity,
    @Body() body: UpdateUserDto,
  ): Promise<UsersResponse> {
    return await this.userService.updateCurrentUser(user, body);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserObj() user: UserEntity,
  ): Promise<UsersResponse> {
    return this.userService.findOne(id);
  }
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @UserObj() user: UserEntity,
  ): Promise<void> {
    return this.userService.remove(id, user);
  }
}
