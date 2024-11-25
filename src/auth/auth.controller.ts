import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/token')
  @ApiOperation({ summary: 'Login For Access Token' })
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const user = this.authService.login(loginDto);

    return user;
  }
}
