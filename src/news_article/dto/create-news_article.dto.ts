import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsArticleDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  title: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  content: string;

  @ApiProperty({ type: Date, description: 'This is a required property' })
  createdDate: string;
}
