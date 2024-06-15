import { Controller, Get, UseGuards, Request, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ChatsService } from './chats.service';
// Roles //
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/roles.decorator';
import { UserRole } from '../enums/user-role';
// DTos //
import { CreateChatDto } from './dtos/createchat.dto';

@Controller('chats')
@UseGuards(RolesGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  @Roles(UserRole.user)
  async getAllChats(@Request() req: any) {
    return await this.chatsService.getAllChats(req.user.role);
  }

  @Get(":id")
  @Roles(UserRole.user)
  async getChat(@Param("id") id: string, @Request() req: any) {
    return await this.chatsService.getChat(+id, req.user.role);
  }

  @Post()
  @Roles(UserRole.admin)
  async createChat(@Body() data: CreateChatDto) {
    return await this.chatsService.createChat(data);
  }

  @Put(":id")
  @Roles(UserRole.admin)
  async editChat(@Param("id") id: string, @Body() data: CreateChatDto) {
    return await this.chatsService.editChat(+id, data);
  }

  @Delete("clear/:id")
  @Roles(UserRole.admin)
  async clearChat(@Param("id") id: string) {
    return await this.chatsService.clearChat(+id);
  }

  @Delete(":id")
  @Roles(UserRole.admin)
  async deleteChat(@Param("id") id: string) {
    return await this.chatsService.deleteChat(+id);
  }

}
