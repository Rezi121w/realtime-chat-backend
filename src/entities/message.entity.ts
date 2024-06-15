import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity, JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
// Entities //
import { UserEntity } from './user.entity';
import { ChatEntity } from './chat.entity';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text', charset: 'utf8mb4' })
  content!: string;

  @ManyToOne(() => UserEntity, (user) => user.messages, { eager: true })
  sender!: UserEntity;

  @Column()
  chatId!: number

  @ManyToOne(() => ChatEntity, (chat) => chat.messages)
  @JoinColumn({ name: 'chatId', referencedColumnName: 'id' } )
  chat!: ChatEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

}