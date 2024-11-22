import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({type: String, description: 'This is a required property'})
    full_name: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    email: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    username: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    password: string;

    @ApiProperty({ type: Boolean, description: 'User disabled status', default: false })
    disabled: boolean = false;
}
