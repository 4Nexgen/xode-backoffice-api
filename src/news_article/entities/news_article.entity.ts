import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class NewsArticle extends Document {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop({ type: Date, required: true })
  createdDate: string;
}

export const NewsArticleSchema = SchemaFactory.createForClass(NewsArticle);
