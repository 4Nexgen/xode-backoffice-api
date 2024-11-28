import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  category: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  imagePath: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  type: string;
}
