import { IsNotEmpty, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class ChangeProfileDto {

    @IsString()
    @IsNotEmpty()
    @IsUrl()
    @Matches(/\.(jpg|jpeg|png|gif)$/i, {
        message: 'Profile image must be a valid URL to an image file (jpg, jpeg, png, gif)',
    })
    profileImage!: string;

}
