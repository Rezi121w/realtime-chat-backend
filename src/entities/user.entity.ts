import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

// Role //
import { UserRole } from "../enums/user-role";
// Entities //
import { MessageEntity } from './message.entity';
import { Exclude } from "class-transformer";

@Entity('users')
export class UserEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'enum', enum: UserRole})
    role!: UserRole;

    @Column()
    userName!: string;

    @Column({nullable: true})
    profileImg!: String;

    @Column({nullable: true})
    @Exclude()
    isBlocked!: boolean;

    @Column()
    @Exclude()
    $pass!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;

    // DDD > ) //

    @OneToMany(() => MessageEntity, (message) => message.sender)
    messages!: MessageEntity[];

    // Private Functions

    setPassword(pass: string) {
        this.$pass = pass;
    }

    isPasswordCorrect(pass: string) {
        return this.$pass == pass && pass != null && pass != "null";
    }

}
