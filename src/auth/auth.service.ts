import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
// Entities //
import { UserEntity } from '../entities';
// DTos //
import { Auth } from './dto/auth.dto';
import { Pass } from './dto/changepass.dto';
import { ChangeProfileDto } from './dto/changeProfile.dto';



@Injectable()
export class AuthService {

  constructor(@InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>, private jwtService: JwtService) {};
  
  // User Login //

  async login(date: Auth) {
    const user = await this.UserRepository.findOne({ where: { userName: date.username } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    if(user.isBlocked) {
      throw new HttpException("You Are Blocked By Admin!", HttpStatus.FORBIDDEN);
    }

    const isPasswordCorrect = user.isPasswordCorrect(date.pass);

    if(!isPasswordCorrect) {
      throw new HttpException("Incorrect Password", HttpStatus.UNAUTHORIZED);
    }

    const payload = {id: user.id, role: user.role};

    return {
      accessToken: `${this.jwtService.sign(payload)}`,
    };

  }

  async changePassword(userId: number, data: Pass) {
    const user = await this.UserRepository.findOne({where: {id: userId} });
    if(!user) {
      throw new HttpException("User Not Found!", HttpStatus.NOT_FOUND);
    }

    if(!user.isPasswordCorrect(data.pass)) {
      throw new HttpException("Incorrect Last Password!", HttpStatus.FORBIDDEN);
    }

    user.setPassword(data.newpass);
    await this.UserRepository.save(user);
    return "Successfully!";
  }

  async editProfileImage(userId: number, data: ChangeProfileDto) {
    const user = await this.UserRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    user.profileImg = data.profileImage;
    return await this.UserRepository.save(user);
  }

  // Get User //
  async getUser(userId: number) {
    const user = await this.UserRepository.findOne({where: {id: userId}} );
    if(!user) {
      throw new HttpException("User Not Found!", HttpStatus.NOT_FOUND);
    }
    const {$pass, isBlocked, ...filteredUser} = user;
    return filteredUser;
  }

  // Get Access Token Payload //
  async getAccessToken(Token: string) {
    let payload;

    try {
      payload = this.jwtService.verify(Token);
    } catch (error) {
      throw new UnauthorizedException('UnAuthorized');
    }

    const user = await this.UserRepository.findOne({where: {id: payload.id} });
    const isBlocked = user.isBlocked;

    return [payload, isBlocked];
  }

}
