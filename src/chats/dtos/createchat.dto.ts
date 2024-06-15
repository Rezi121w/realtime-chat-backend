import { IsEnum, IsNotEmpty, IsString, } from 'class-validator';
import { UserRole } from '../../enums/user-role';

export class CreateChatDto {

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(UserRole)
  requiredRole!: UserRole;

}
