import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class EditMessageDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @MinLength(1)
  content!: string;


}
