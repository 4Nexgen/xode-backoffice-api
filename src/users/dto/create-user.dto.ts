import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  full_name: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  email: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  username: string;

  @Exclude()
  @ApiProperty({ type: String, description: 'This is a required property' })
  password: string;

  @ApiProperty({
    type: Boolean,
    description: 'User disabled status',
    default: false,
  })
  disabled: boolean = false;
}

export class GetUserDto {
  @ApiProperty({ type: String, description: 'Full name of the user' })
  full_name: string;

  @ApiProperty({ type: String, description: 'Email of the user' })
  email: string;

  @ApiProperty({ type: String, description: 'Username of the user' })
  username: string;

  @ApiProperty({ type: Boolean, description: 'User disabled status' })
  disabled: boolean;
}
