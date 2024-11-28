import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class Category extends Document {
  @Prop()
  category: string;

  @Prop()
  type: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
