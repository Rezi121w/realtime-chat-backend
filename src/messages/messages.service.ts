import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Entities //
import { ChatEntity, MessageEntity, UserEntity } from '../entities';
// DTos //
import { CreateMessage } from './dtos/message.dto';
import { EditMessageDto } from './dtos/editmessage.dto';
// Roles //
import { checkUserRoleHierarchy } from '../guards/checkRole';


@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(ChatEntity) private chatRepository: Repository<ChatEntity>,
    @InjectRepository(MessageEntity) private messageRepository: Repository<MessageEntity>,
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,) {}

  async createMessage(data: CreateMessage, payload: any) {
    const chat = await this.chatRepository.findOne({where: {id: data.chatId} });

    if (!chat) {
      throw new HttpException("Chat Not Found!", HttpStatus.NOT_FOUND);
    }
    if(!checkUserRoleHierarchy(payload.role, chat.requiredRole)) {
      throw new HttpException("You Can`t Access This Chat!", HttpStatus.FORBIDDEN);
    }

    const user = await this.usersRepository.findOne({where: {id: payload.id} });
    if(!user) {
      throw new HttpException("User Not Found!", HttpStatus.NOT_FOUND);
    }


    const newMessage = await this.messageRepository.create();
    newMessage.content = data.content;
    newMessage.sender = user;
    newMessage.chat = chat;

    await this.messageRepository.save(newMessage);
    return true;
  }

  async editMessage(id: number, userId: number, data: EditMessageDto) {
    const message = await this.messageRepository.findOne({where: {id: id} });
    if(!message) {
      throw new HttpException("Message Not Found!", HttpStatus.NOT_FOUND);
    }
    if(message.sender.id != userId) {
      throw new HttpException("You Are`Not Message Owner!", HttpStatus.FORBIDDEN);
    }

    message.content = data.content;
    return await this.messageRepository.save(message);
  }

  async deleteMessage(id: number, userId: number) {
    const message = await this.messageRepository.findOne({where: {id: id} });
    if(!message) {
      throw new HttpException("Message Not Found!", HttpStatus.NOT_FOUND);
    }
    if(message.sender.id != userId) {
      throw new HttpException("You Are`Not Message Owner!", HttpStatus.FORBIDDEN);
    }

    return await this.messageRepository.softDelete(message.id);
  }

}
