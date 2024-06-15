import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// Entities //
import { ChatEntity, MessageEntity } from '../entities';
// Roles //
import { checkUserRoleHierarchy } from '../guards/checkRole';
// DTos //
import { CreateChatDto } from './dtos/createchat.dto';

@Injectable()
export class ChatsService {
  constructor(@InjectRepository(ChatEntity) private chatRepository: Repository<ChatEntity>,
              @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>) {}

  async getAllChats(userRole: string){
    const chats = await this.chatRepository
      .createQueryBuilder('chat')
      .getMany();

    return chats.filter(chat => checkUserRoleHierarchy(userRole, chat.requiredRole));
  }

  async getChat(id: number, userRole: string) {
    const chat = await this.chatRepository.findOne({where: {id: id} });
    if (!chat) {
      throw new HttpException("Chat Not Found!", HttpStatus.NOT_FOUND);
    }
    if(!checkUserRoleHierarchy(userRole, chat.requiredRole)) {
      throw new HttpException("You Can`t Access The Chat!", HttpStatus.FORBIDDEN);
    }

    return chat;
  }

  async createChat(data: CreateChatDto){
    const newChat = this.chatRepository.create(data);
    return await this.chatRepository.save(newChat);
  }

  async editChat(id: number, data: CreateChatDto){
    const chat = await this.chatRepository.findOne({where: {id: id} });
    if (!chat) {
      throw new HttpException("Chat Not Found!", HttpStatus.NOT_FOUND);
    }

    chat.name = data.name;
    chat.requiredRole = data.requiredRole;

    return await this.chatRepository.save(chat);
  }

  async clearChat(id: number){
    const chat = await this.chatRepository.findOne({where: {id: id} });
    if (!chat) {
      throw new HttpException("Chat Not Found!", HttpStatus.NOT_FOUND);
    }
    const allMessages = await this.messageRepository.find({where: {chatId: id}});

    return await this.messageRepository.remove(allMessages);
  }

  async deleteChat(id: number) {
    await this.clearChat(id);
    return await this.chatRepository.softDelete(id);
  }

}
