import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
//
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
// Roles //
import { RolesGuard } from '../guards/role.guard';
import { ChatEntity, MessageEntity, UserEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity, UserEntity]), AuthModule],
  controllers: [MessagesController],
  providers: [MessagesService, RolesGuard],
})
export class MessagesModule {}
