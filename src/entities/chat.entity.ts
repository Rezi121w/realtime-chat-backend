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

  @CreateDateColumn({ type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)' })
   createdAt: Date;

  @UpdateDateColumn({ type: 'datetime', precision: 6, default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
   updatedAt: Date;

  @DeleteDateColumn()
  deletedAt!: Date;

}