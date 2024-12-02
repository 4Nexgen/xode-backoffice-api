import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogTranslationDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  blogId: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  languageCode: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  translatedText: string;
}
