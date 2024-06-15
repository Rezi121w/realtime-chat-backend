import { Body, Controller, Delete, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
// DTos //
import { CreateMessage } from './dtos/message.dto';
import { EditMessageDto } from './dtos/editmessage.dto';
// Roles //
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/roles.decorator';
import { UserRole } from '../enums/user-role';


@Controller('messages')
@UseGuards(RolesGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Roles(UserRole.user)
  async sendMessage(@Body() data: CreateMessage, @Request() req: any) {
    return await this.messagesService.createMessage(data, req.user);
  }

  @Put(":id")
  @Roles(UserRole.user)
  async editMessage(@Param("id") id: string, @Request() req: any, @Body() data: EditMessageDto) {
    return await this.messagesService.editMessage(+id, req.user.id, data);
  }

  @Delete(":id")
  @Roles(UserRole.user)
  async deleteMessage(@Param("id") id: string, @Request() req: any) {
    return await this.messagesService.deleteMessage(+id, req.user.id);
  }

}
