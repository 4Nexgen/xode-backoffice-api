import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogTranslationDto {
  @ApiProperty({ type: String, description: 'This is a required property' })
  languageCode: string;

  @ApiProperty({ type: String, description: 'This is a required property' })
  translatedText: string;
}
