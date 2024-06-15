import * as dotenv from 'dotenv';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
// Entities //
import { UserEntity } from "../entities";
// Roles //
import { RolesGuard } from '../guards/role.guard';

dotenv.config();
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret: process.env.JWT_TOKEN_SECRET,
    signOptions: {expiresIn: process.env.JWT_EXPIRATION_TIME}
})],
  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
  exports: [AuthService, JwtModule],
})

export class AuthModule {}