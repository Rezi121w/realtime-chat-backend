// Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
// Base //
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
// Entities
import { ChatEntity } from "./entities/chat.entity";

dotenv.config()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DBNAME,
      entities: [ChatEntity],
      synchronize: true,
    }),
    ChatModule],
    controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
