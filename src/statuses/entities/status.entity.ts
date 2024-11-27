import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Status extends Document {
  @Prop()
  status: string;

  @Prop()
  type: string;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
