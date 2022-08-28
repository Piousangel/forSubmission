import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidEntity } from './boss-raid.entity';
import { BossRaidService } from './boss-raid.service';
import { HttpModule } from '@nestjs/axios';
import { DataSource } from 'typeorm';
import { UsersService } from '../users/users.service';
import { UserRankingService } from '../user-ranking/user-ranking.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,		// Redis의 기본포트번호
   }),
    TypeOrmModule.forFeature([BossRaidEntity]),
    HttpModule],
  controllers: [BossRaidController],
  providers: [BossRaidService, UsersService, UserRankingService]
})

export class BossRaidModule {
  constructor(private dataSource : DataSource){}
}
