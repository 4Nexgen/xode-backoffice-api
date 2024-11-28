import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  toJSON: {
    versionKey: false,
  },
  timestamps: true,
})
export class User extends Document {
  @Prop()
  full_name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  disabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
