import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find().exec();
    } catch (error) {
      throw new Error;
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.userModel.findById(id).exec();

      return user;
    } catch (error) {
      throw new Error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();

      return user;
    } catch (error) {
      throw new Error;
    }
  }

  async create(signUpDto: CreateUserDto): Promise<User> {
    try {
      const { full_name, email, username, password } = signUpDto;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userModel.create({
          full_name,
          email,
          username,
          password: hashedPassword,
      });

      return user;
    } catch (error) {
      throw new Error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, updateUserDto, { new: true })
        .exec(); 

      return updatedUser;
    } catch (error) {
      throw new Error;
    }
  }

  async updateDisableUser(id: string, disable: boolean): Promise<User | null> {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { disabled: disable },
        { new: true },
      );

      return updatedUser;
    } catch (error) {
      throw new Error;
    }
  }
}
