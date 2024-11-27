import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  status: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  type: string;
}
