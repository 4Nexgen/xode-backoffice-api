import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class BlogTranslation extends Document {
  @Prop()
  blogId: string;

  @Prop()
  languageCode: string;

  @Prop()
  translatedText: string;
}

export const BlogTranslationSchema =
  SchemaFactory.createForClass(BlogTranslation);
