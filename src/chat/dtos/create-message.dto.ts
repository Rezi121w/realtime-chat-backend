import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  message!: string;

  @IsString()
  @IsNotEmpty()
  authorName!: string;

  @IsString()
  @IsOptional()
  profileImg!: string;

}