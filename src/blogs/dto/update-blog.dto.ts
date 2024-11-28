import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  title: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  sub_title: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  author: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  featureImage: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  content: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  category: string;

  @ApiProperty({
    type: Boolean,
    description: 'This is a required property',
    default: false,
  })
  isPublished: boolean = false;
}
