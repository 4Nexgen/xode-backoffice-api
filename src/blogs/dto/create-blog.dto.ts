import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  title: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  subTitle: string;

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

  @ApiProperty({ type: Date, description: 'This is a required property' })
  publishedDate: string;
}
