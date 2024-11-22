import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';

import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,
      ) {}
    
      async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { username, password } = loginDto;
    
        const user = await this.userModel.findOne({ 
          $or: [{ email: username }, { username: username }]
         });
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
    
        return { token };
      }
}
