import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, GetUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.userModel.find({}, '-password').exec();

    return users;
  }

  async findOne(id: string): Promise<GetUserDto> {
    const user = await this.userModel.findById(id, '-password').exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createDto: CreateUserDto): Promise<GetUserDto> {
    const { full_name, email, username, password } = createDto;

    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      full_name,
      email,
      username,
      password: hashedPassword,
      disabled: false,
    });

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, {
        new: true,
        projection: '-password',
      })
      .exec();

    return updatedUser;
  }

  async updateDisableUser(id: string, disable: boolean): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { disabled: disable },
      { new: true, projection: '-password' },
    );

    return updatedUser;
  }
}
