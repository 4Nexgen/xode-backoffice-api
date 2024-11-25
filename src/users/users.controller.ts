import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get All Users' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get User' })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Post()
  // @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create User' })
  async createUser(@Body() createUserDTO: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDTO);
    return createdUser;
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update User' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    return updatedUser;
  }

  @Patch('disable/:id/:disable')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Disable User' })
  async disableUser(
    @Param('id') id: string,
    @Param('disable') disable: boolean,
  ) {
    const updatedUser = await this.usersService.updateDisableUser(id, disable);

    return updatedUser;
  }
}
