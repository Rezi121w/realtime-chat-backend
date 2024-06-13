import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
// Entities //
import { ChatEntity } from "../entities/chat.entity";
// DTos //
import { CreateMessageDto } from "./dtos/create-message.dto";

@Injectable()
export class ChatService {
  constructor(@InjectRepository(ChatEntity) private readonly chatRepository: Repository<ChatEntity>) {}

  async getAllMessages() {
    return await this.chatRepository.find();
  }

  async createMessage(data: CreateMessageDto) {
    const newMessage = this.chatRepository.create(data);

    await this.chatRepository.save(newMessage);

    return newMessage;
  }

}
