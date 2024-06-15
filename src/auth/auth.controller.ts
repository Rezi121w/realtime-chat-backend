import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
// DTos //
import { Auth } from './dto/auth.dto';
import { Pass } from './dto/changepass.dto';
import { ChangeProfileDto } from './dto/changeProfile.dto';
// Roles //
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/roles.decorator';
import { UserRole } from '../enums/user-role';


@Controller('auth')
@UseGuards(RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // User Login //

  @Post()
  async login(@Body() date: Auth) {
    return this.authService.login(date);
  }

  @Post("/change")
  @Roles(UserRole.user)
  async changePassword(@Request() req: any, @Body() data: Pass) {
    return this.authService.changePassword(req.user.id, data);
  }

  @Post("/profile")
  @Roles(UserRole.user)
  async editProfileImage(@Request() req: any, @Body() data: ChangeProfileDto) {
    return this.authService.editProfileImage(req.user.id, data);
  }

  @Get("/me")
  @Roles(UserRole.user)
  async getUser(@Request() req: any) {
    return this.authService.getUser(req.user.id);
  }


}

