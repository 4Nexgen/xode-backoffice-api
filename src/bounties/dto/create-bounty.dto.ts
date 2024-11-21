import { ApiProperty } from "@nestjs/swagger";

export class CreateBountyDto {
    @ApiProperty({type: String, description: 'This is a required property'})
    date: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    category: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    title: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    description: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    specification: string;

    @ApiProperty({type: Number, description: 'This is a required property'})
    bounty_price: number;

    @ApiProperty({type: String, description: 'This is a required property'})
    status: string;
}
