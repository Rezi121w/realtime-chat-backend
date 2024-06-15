import { IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator';

export class Pass {

  @IsString()
  @IsNotEmpty()
  pass!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  newpass!: string;

}
