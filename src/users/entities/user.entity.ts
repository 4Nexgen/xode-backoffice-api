import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class User {

    @Prop()
    full_name: string;

    @Prop({ unique: [true, 'Duplicate email entered']})
    email: string;

    @Prop()
    username: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User)
