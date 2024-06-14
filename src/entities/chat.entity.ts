import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity("chat")
export class ChatEntity {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column()
  authorName!: string;

  @Column({nullable: true})
  profileImg: string;

  @DeleteDateColumn()
  deletedAt!: Date;

}