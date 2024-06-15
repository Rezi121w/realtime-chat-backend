import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { AuthModule } from '../auth/auth.module';
//
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { ChatEntity, MessageEntity } from '../entities';
// Roles //
import { RolesGuard } from '../guards/role.guard';


@Module({
  imports: [TypeOrmModule.forFeature([ChatEntity, MessageEntity]), AuthModule],
  controllers: [ChatsController],
  providers: [ChatsService, RolesGuard],
})
export class ChatsModule {}
