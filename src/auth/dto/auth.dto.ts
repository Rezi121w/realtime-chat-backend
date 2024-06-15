import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class Auth {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    username!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    pass!: string;

}
