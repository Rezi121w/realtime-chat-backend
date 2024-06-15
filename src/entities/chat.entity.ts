import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Entities //
import { Exclude } from "class-transformer";
// Roles //
import { UserRole } from '../enums/user-role';
import { MessageEntity } from './message.entity';

@Entity('chats')
export class ChatEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Exclude()
  @Column({ type: 'enum', enum: UserRole })  // Используйте enum для ролей
  requiredRole!: UserRole;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

  @OneToMany(() => MessageEntity, (message) => message.chat, {eager: true} )
  messages!: MessageEntity[];

}
