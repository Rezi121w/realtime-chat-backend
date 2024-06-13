import { Body, Controller, Get, Post } from "@nestjs/common";
import { ChatService } from './chat.service';
// Dtos //
import { CreateMessageDto } from "./dtos/create-message.dto";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getAllMessage() {
    return await this.chatService.getAllMessages();
  }

  @Post()
  async createMessage(@Body() data: CreateMessageDto) {
    return await this.chatService.createMessage(data);
  }

}
