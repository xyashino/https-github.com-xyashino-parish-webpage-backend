import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user.decorator';
import { UserEntity } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { Serialize } from '../interceptors/serialization.interceptor';
import { UsersResponse } from '../types/users/users-response.interface';

@Controller('users')
@Serialize(UserDto)
export class UserController {
  @Inject(forwardRef(() => UserService))
  public userService: UserService;

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllUsers(): Promise<UsersResponse> {
    return this.userService.findAll();
  }
  @Post('register')
  register(@Body() body: RegisterUserDto): Promise<UsersResponse> {
    return this.userService.register(body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    body: DeleteUserDto,
  ): Promise<void> {
    return this.userService.remove(id, body);
  }
  @Get('current')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@UserObj() user: UserEntity): UsersResponse {
    return this.userService.getCurrentUser(user);
  }
}
