import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
      ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userModel.findOne(payload.sub);

    if(!user) {
      throw new UnauthorizedException('Login first to access this endpoint')
    }

    return user;
  }
}

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     @InjectModel(User.name)
//     private readonly userModel: Model<User>,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRETS, 
//     });
//   }

//   async validate(payload: any) {
//     const { id } = payload;

//     const user = await this.userModel.findById(id);

//     if(!user) {
//       throw new UnauthorizedException('Login first to access this endpoint')
//     }

//     return user;
//   }
// }