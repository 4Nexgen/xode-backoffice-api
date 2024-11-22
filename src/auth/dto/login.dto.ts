import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({type: String, description: 'This is a required property'})
    username: string;

    @ApiProperty({type: String, description: 'This is a required property'})
    password: string;
}