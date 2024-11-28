import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class Blog extends Document {
  @Prop()
  title: string;

  @Prop()
  subTitle: string;

  @Prop()
  featureImage: string;

  @Prop()
  content: string;

  @Prop()
  category: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ type: Date, required: true })
  publishedDate: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
