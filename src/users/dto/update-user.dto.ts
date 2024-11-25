import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  full_name: string;
}
