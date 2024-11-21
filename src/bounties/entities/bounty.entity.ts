import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Bounty {

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
}

export const BountySchema = SchemaFactory.createForClass(Bounty)
