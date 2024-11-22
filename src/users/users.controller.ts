import { Controller, Get, Post, Body, Patch, Param, UseGuards, HttpException, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
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
  @ApiOperation({ summary: 'Get All Users'})
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get User'})
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  // @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Create User'})
  async createUser(@Body() signUpDto: CreateUserDto) {
    try {
      const existingUser = await this.usersService.findByEmail(signUpDto.email);
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }

      console.log(existingUser)
      const createdUser = await this.usersService.create(signUpDto);

      return {
        message: 'User created successfully',
        user: createdUser,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Update User' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      if (!id || id.length !== 24) {
        throw new BadRequestException('Invalid ID format');
      }

      const updatedUser = await this.usersService.update(id, updateUserDto);

      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  @Patch('disable/:id/:disable')
  async disableUser(
    @Param('id') id: string,
    @Param('disable') disable: boolean,
  ) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) {
        throw new HttpException(
          {
            message: 'User not found.',
            data: null,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUser = await this.usersService.updateDisableUser(id, disable);

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        {
          message: `Internal Server Error: ${error.message}`,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
