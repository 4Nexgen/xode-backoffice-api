import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Bounty extends Document {
  @Prop({ type: Date, required: true })
  date: string;

  @Prop()
  category: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  specification: string;

  @Prop()
  bounty_price: number;

  @Prop()
  status: string;

  @Prop()
  github_issue_url: string;
}

export const BountySchema = SchemaFactory.createForClass(Bounty);
